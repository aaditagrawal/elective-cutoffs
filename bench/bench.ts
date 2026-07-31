/**
 * Head-to-head benchmark: frozen reference implementation vs. the optimized
 * query engine, measured in the same process on the same data.
 *
 *   bun run bench/bench.ts
 *
 * Every case is warmed up, then run in timed batches; we report the best batch
 * (least noise) as ns/op, plus the speedup. Results are checksummed so the
 * optimizer can't win by skipping work.
 */
import { semesterDatasets, filterElectives, getStats, type Elective } from "@/lib/electives";
import { refFilterElectives, refGetStats } from "./reference-impl";
import { benchKeystrokes, SEMESTERS } from "./scenarios";

const BATCHES = 12;
const MIN_BATCH_MS = 60;

let sink = 0;

/** Consume results so nothing can be optimized away, and detect divergence. */
function consume(list: Elective[]): number {
  let h = list.length;
  for (let i = 0; i < list.length; i++) h = (h * 31 + list[i].students + i) | 0;
  return h;
}

type Result = { nsPerOp: number; checksum: number; opsRun: number };

function measure(label: string, fn: () => number): Result {
  // Warmup: enough iterations to reach steady state and trigger JIT tiering.
  for (let i = 0; i < 5; i++) fn();

  // Calibrate a batch size that runs for at least MIN_BATCH_MS.
  let iters = 1;
  for (;;) {
    const t0 = performance.now();
    for (let i = 0; i < iters; i++) fn();
    const dt = performance.now() - t0;
    if (dt >= MIN_BATCH_MS || iters > 1 << 22) break;
    iters = Math.max(iters * 2, Math.ceil((iters * MIN_BATCH_MS) / Math.max(dt, 0.01)));
  }

  let best = Infinity;
  let checksum = 0;
  for (let b = 0; b < BATCHES; b++) {
    const t0 = performance.now();
    for (let i = 0; i < iters; i++) checksum = fn();
    const dt = performance.now() - t0;
    best = Math.min(best, (dt * 1e6) / iters);
  }
  sink += checksum;
  void label;
  return { nsPerOp: best, checksum, opsRun: iters * BATCHES };
}

function fmtNs(ns: number): string {
  if (ns >= 1e6) return (ns / 1e6).toFixed(3) + " ms";
  if (ns >= 1e3) return (ns / 1e3).toFixed(2) + " µs";
  return ns.toFixed(0) + " ns";
}

const rows: Array<{ case: string; before: number; after: number; ok: boolean }> = [];
const oneTime: Array<{ case: string; ns: number }> = [];

/**
 * Whichever side runs first pays the JIT tiering cost, which is worth ~1.5× on a
 * short case — enough to invent a speedup out of identical code. So warm both
 * sides first, then measure in both orders and keep each side's best.
 */
function compare(name: string, before: () => number, after: () => number) {
  for (let i = 0; i < 3; i++) {
    before();
    after();
  }
  const b1 = measure(name + ":before", before);
  const a1 = measure(name + ":after", after);
  const a2 = measure(name + ":after", after);
  const b2 = measure(name + ":before", before);
  rows.push({
    case: name,
    before: Math.min(b1.nsPerOp, b2.nsPerOp),
    after: Math.min(a1.nsPerOp, a2.nsPerOp),
    ok: b1.checksum === a1.checksum,
  });
}

for (const semester of SEMESTERS) {
  const electives = semesterDatasets[semester].electives;
  const keystrokes = benchKeystrokes(semester);
  const n = electives.length;
  const tag = `${semester} (n=${n})`;

  // --- The dominant hot path: one keystroke re-runs the whole query ---------
  compare(
    `${tag} typing stream — ${keystrokes.length} keystrokes, sort=cutoff`,
    () => {
      let h = 0;
      for (const q of keystrokes) h = consume(refFilterElectives(electives, "all", "all", q, "cutoff", "asc"));
      return h;
    },
    () => {
      let h = 0;
      for (const q of keystrokes) h = consume(filterElectives(electives, "all", "all", q, "cutoff", "asc"));
      return h;
    },
  );

  compare(
    `${tag} typing stream — sort=name (localeCompare)`,
    () => {
      let h = 0;
      for (const q of keystrokes) h = consume(refFilterElectives(electives, "all", "all", q, "name", "asc"));
      return h;
    },
    () => {
      let h = 0;
      for (const q of keystrokes) h = consume(filterElectives(electives, "all", "all", q, "name", "asc"));
      return h;
    },
  );

  // --- No search, just re-sorting (toggling sort buttons) ------------------
  compare(
    `${tag} sort toggle — no filters`,
    () => consume(refFilterElectives(electives, "all", "all", "", "name", "desc")),
    () => consume(filterElectives(electives, "all", "all", "", "name", "desc")),
  );

  compare(
    `${tag} filter by type + dept`,
    () => consume(refFilterElectives(electives, electives[0].type, electives[0].department, "", "cutoff", "asc")),
    () => consume(filterElectives(electives, electives[0].type, electives[0].department, "", "cutoff", "asc")),
  );

  // --- Stats (steady state: the index memoizes these) ----------------------
  compare(
    `${tag} getStats (warm)`,
    () => {
      const s = refGetStats(electives);
      return (s.totalStudents + s.totalElectives + s.departments) | 0;
    },
    () => {
      const s = getStats(electives);
      return (s.totalStudents + s.totalElectives + s.departments) | 0;
    },
  );

  // --- The one-time cost that buys all of the above ------------------------
  // A fresh array object is a fresh WeakMap key, so this forces a full rebuild:
  // permutations, haystacks, character bitmaps and stats.
  const build = measure(`${tag} index build`, () => {
    const copy = electives.slice();
    const s = getStats(copy);
    return (s.totalStudents + s.totalElectives) | 0;
  });
  oneTime.push({ case: `${tag} cold index build (amortized over the session)`, ns: build.nsPerOp });

  // For scale: what the old code paid on *every* keystroke, for comparison
  // against the one-time build above.
  const oneKeystroke = measure(`${tag} single old query`, () =>
    consume(refFilterElectives(electives, "all", "all", "machine", "cutoff", "asc")),
  );
  oneTime.push({ case: `${tag} ...vs one old-code query`, ns: oneKeystroke.nsPerOp });
}

const w = Math.max(...rows.map((r) => r.case.length));
console.log("\n" + "case".padEnd(w) + "  " + "before".padStart(11) + "  " + "after".padStart(11) + "  speedup");
console.log("-".repeat(w + 40));
for (const r of rows) {
  const speedup = r.before / r.after;
  const flag = r.ok ? "" : "  ⚠️ CHECKSUM MISMATCH";
  console.log(
    r.case.padEnd(w) +
      "  " +
      fmtNs(r.before).padStart(11) +
      "  " +
      fmtNs(r.after).padStart(11) +
      "  " +
      speedup.toFixed(2) +
      "×" +
      flag,
  );
}

console.log("one-time costs (paid once per dataset, on the first query):");
const w2 = Math.max(...oneTime.map((r) => r.case.length));
for (const r of oneTime) console.log("  " + r.case.padEnd(w2) + "  " + fmtNs(r.ns).padStart(11));
console.log();
if (sink === 12345.6789) console.log("unreachable");
