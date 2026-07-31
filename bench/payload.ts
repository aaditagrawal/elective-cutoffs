/**
 * Payload benchmark: what the compact encoding costs and saves.
 *
 *   bun run bench/payload.ts
 *
 * Turbopack emits large JSON imports as `JSON.parse('...')` rather than as
 * object literals — verified by grepping the built chunk — so parsing a string
 * is what the browser actually does, and measuring it here is representative
 * rather than a proxy.
 */
import { readFileSync } from "node:fs";
import { gzipSync, brotliCompressSync, constants } from "node:zlib";
import { semesterDatasets, type SemesterId } from "@/lib/electives";

const SEMESTERS: SemesterId[] = ["sixth", "seventh"];

function sizes(buf: Buffer) {
  return {
    raw: buf.length,
    gzip: gzipSync(buf, { level: 9 }).length,
    brotli: brotliCompressSync(buf, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
    }).length,
  };
}

function measure(fn: () => number): number {
  for (let i = 0; i < 50; i++) fn();
  let best = Infinity;
  for (let b = 0; b < 12; b++) {
    const t0 = performance.now();
    for (let i = 0; i < 300; i++) fn();
    best = Math.min(best, ((performance.now() - t0) * 1e6) / 300);
  }
  return best;
}

interface Compact {
  count: number;
  types: string[];
  typeLabels: string[];
  departments: string[];
  typeCodes: number[];
  typeLabelCodes: number[];
  departmentCodes: number[];
  codes: string[];
  names: string[];
  lowestCGPA: number[];
  highestCGPA: number[];
  students: number[];
}

/** Same decode as `lib/electives.ts`, inlined so this file measures it directly. */
function decode(k: Compact) {
  const out = new Array(k.count);
  for (let i = 0; i < k.count; i++) {
    out[i] = {
      type: k.types[k.typeCodes[i]],
      typeLabel: k.typeLabels[k.typeLabelCodes[i]],
      code: k.codes[i],
      name: k.names[i],
      department: k.departments[k.departmentCodes[i]],
      lowestCGPA: k.lowestCGPA[i],
      highestCGPA: k.highestCGPA[i],
      students: k.students[i],
    };
  }
  return out;
}

const pct = (before: number, after: number) => ((1 - after / before) * 100).toFixed(1) + "%";

console.log("\nbytes on disk (what the bundler embeds):\n");
console.log("dataset".padEnd(10) + "encoding".padEnd(12) + "raw".padStart(9) + "gzip".padStart(9) + "brotli".padStart(9));
console.log("-".repeat(49));

let rawBefore = 0;
let rawAfter = 0;
let gzBefore = 0;
let gzAfter = 0;

for (const semester of SEMESTERS) {
  const source = sizes(readFileSync(`data/${semester}-semester.json`));
  const compact = sizes(readFileSync(`data/${semester}-semester.compact.json`));
  rawBefore += source.raw;
  rawAfter += compact.raw;
  gzBefore += source.gzip;
  gzAfter += compact.gzip;
  console.log(
    semester.padEnd(10) + "row-oriented".padEnd(12) +
      String(source.raw).padStart(9) + String(source.gzip).padStart(9) + String(source.brotli).padStart(9),
  );
  console.log(
    "".padEnd(10) + "compact".padEnd(12) +
      String(compact.raw).padStart(9) + String(compact.gzip).padStart(9) + String(compact.brotli).padStart(9),
  );
}
console.log("-".repeat(49));
console.log(`total      raw ${rawBefore} -> ${rawAfter} (${pct(rawBefore, rawAfter)} smaller), gzip ${gzBefore} -> ${gzAfter} (${pct(gzBefore, gzAfter)} smaller)`);

console.log("\ntime to reach an identical Elective[] from the embedded string:\n");
for (const semester of SEMESTERS) {
  const sourceStr = readFileSync(`data/${semester}-semester.json`, "utf8");
  const compactStr = readFileSync(`data/${semester}-semester.compact.json`, "utf8");
  const n = semesterDatasets[semester].electives.length;

  const before = measure(() => JSON.parse(sourceStr).electives.length);
  const after = measure(() => decode(JSON.parse(compactStr) as Compact).length);

  console.log(
    `${semester.padEnd(9)} n=${String(n).padEnd(5)} ` +
      `parse ${(before / 1000).toFixed(2)} µs  ->  parse+decode ${(after / 1000).toFixed(2)} µs   ` +
      `${(before / after).toFixed(2)}× faster`,
  );
}
console.log();
