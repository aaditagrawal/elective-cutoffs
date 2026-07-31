/**
 * Render-path benchmark.
 *
 *   bun run bench/render.ts
 *
 * Scope note, because it matters for reading the numbers: this measures the
 * *computation* a render performs, not React's reconciliation. There is no DOM
 * in this harness, so the two structural changes in this PR — memoizing
 * `ElectiveCard` and removing the array index from its key — are not measured
 * here. What is measured is the per-render work those changes avoid repeating,
 * and the size of the tree they avoid rebuilding.
 */
import { semesterDatasets, searchTopK, getCoursePageUrl } from "@/lib/electives";
import { refCommandSearch, refGetCoursePageUrl } from "./reference-impl";
import { benchKeystrokes, SEMESTERS } from "./scenarios";

const BATCHES = 10;
const MIN_BATCH_MS = 50;

let sink = 0;

function measure(fn: () => number): number {
  for (let i = 0; i < 5; i++) fn();
  let iters = 1;
  for (;;) {
    const t0 = performance.now();
    for (let i = 0; i < iters; i++) fn();
    const dt = performance.now() - t0;
    if (dt >= MIN_BATCH_MS || iters > 1 << 22) break;
    iters = Math.max(iters * 2, Math.ceil((iters * MIN_BATCH_MS) / Math.max(dt, 0.01)));
  }
  let best = Infinity;
  for (let b = 0; b < BATCHES; b++) {
    const t0 = performance.now();
    for (let i = 0; i < iters; i++) sink += fn();
    best = Math.min(best, ((performance.now() - t0) * 1e6) / iters);
  }
  return best;
}

function fmtNs(ns: number): string {
  if (ns >= 1e6) return (ns / 1e6).toFixed(3) + " ms";
  if (ns >= 1e3) return (ns / 1e3).toFixed(2) + " µs";
  return ns.toFixed(0) + " ns";
}

const rows: Array<{ case: string; before: number; after: number }> = [];

function compare(name: string, before: () => number, after: () => number) {
  for (let i = 0; i < 3; i++) {
    before();
    after();
  }
  const b1 = measure(before);
  const a1 = measure(after);
  const a2 = measure(after);
  const b2 = measure(before);
  rows.push({ case: name, before: Math.min(b1, b2), after: Math.min(a1, a2) });
}

// Global warmup across *both* datasets before any timing, so the dataset that
// happens to be measured first does not pay JIT tiering costs that the second
// one then finds already paid.
for (const semester of SEMESTERS) {
  const electives = semesterDatasets[semester].electives;
  for (let rep = 0; rep < 50; rep++) {
    for (const q of benchKeystrokes(semester)) {
      sink += refCommandSearch(electives, q).length;
      sink += searchTopK(electives, q, 8).length;
    }
    for (let i = 0; i < electives.length; i++) {
      sink += refGetCoursePageUrl(electives[i].code) === null ? 0 : 1;
      sink += getCoursePageUrl(electives[i].code) === null ? 0 : 1;
    }
  }
}

for (const semester of SEMESTERS) {
  const electives = semesterDatasets[semester].electives;
  const keystrokes = benchKeystrokes(semester);
  const n = electives.length;
  const tag = `${semester} (n=${n})`;

  // The palette shows 8 results. The old code filtered all n electives — calling
  // `query.toLowerCase()` up to three times *per elective* — and then threw all
  // but 8 away. `searchTopK` stops once it has 8.
  compare(
    `${tag} palette top-8 — ${keystrokes.length} keystrokes`,
    () => {
      let h = 0;
      for (const q of keystrokes) h += refCommandSearch(electives, q).length;
      return h;
    },
    () => {
      let h = 0;
      for (const q of keystrokes) h += searchTopK(electives, q, 8).length;
      return h;
    },
  );

  // Course URLs: one per card, previously rebuilt with `encodeURIComponent` and
  // a template interpolation on every render, now a map lookup.
  //
  // The saving tracks how many codes are in the allowlist, not `n` — a miss
  // returns null before building anything. The allowlist currently covers 76 of
  // the 139 sixth-semester codes but only 2 of the 258 seventh-semester ones,
  // which is why the smaller dataset shows the larger win here.
  const inAllowlist = electives.filter((e) => refGetCoursePageUrl(e.code) !== null).length;
  compare(
    `${tag} course URLs × ${n} (${inAllowlist} in allowlist)`,
    () => {
      let h = 0;
      for (let i = 0; i < n; i++) h += refGetCoursePageUrl(electives[i].code) === null ? 0 : 1;
      return h;
    },
    () => {
      let h = 0;
      for (let i = 0; i < n; i++) h += getCoursePageUrl(electives[i].code) === null ? 0 : 1;
      return h;
    },
  );
}

const w = Math.max(...rows.map((r) => r.case.length));
console.log("\n" + "case".padEnd(w) + "  " + "before".padStart(11) + "  " + "after".padStart(11) + "  speedup");
console.log("-".repeat(w + 40));
for (const r of rows) {
  console.log(
    r.case.padEnd(w) +
      "  " +
      fmtNs(r.before).padStart(11) +
      "  " +
      fmtNs(r.after).padStart(11) +
      "  " +
      (r.before / r.after).toFixed(2) +
      "×",
  );
}

console.log(`
Not measured here (no DOM in this harness):
  · memo(ElectiveCard) — changes how many card bodies React invokes per
    keystroke, from every visible card to only the one whose highlight changed.
  · the stable grid key — previously every card's key changed whenever filtering
    or sorting moved it, so React unmounted and remounted the grid rather than
    reordering it, which also made the memo above unable to help.
  · useDeferredValue — lets React drop intermediate list renders when typing
    outpaces rendering. Changes scheduling, not total work.

Deliberately not benchmarked:
  · getDifficultyLevel returning frozen singletons. A microbenchmark of it is
    meaningless — the returned object does not escape the loop, so the JIT
    elides the allocation and the "before" side measures faster at n=258 than at
    n=139. The change is for stable identity under memo, not for allocation cost.
`);
if (sink === 12345.6789) console.log("unreachable");
