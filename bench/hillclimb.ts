/** Compare against a checkout of the exact pre-hillclimb commit, not the old reference engine.
 * bun run bench/hillclimb.ts /absolute/path/to/baseline > results.json
 * Keep both checkouts on the same runtime and run without competing benchmarks.
 */
import * as candidate from "@/lib/electives";
import { benchKeystrokes, SEMESTERS } from "./scenarios";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { cpus } from "node:os";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const baselinePath = process.argv[2];
if (!baselinePath) throw new Error("Pass the baseline checkout path");
const baseline: typeof candidate = await import(
  pathToFileURL(resolve(baselinePath, "lib/electives.ts")).href
);
const REPEATS = 7;
const TARGET_MS = 40;
let sink = 0;

function consume(electives: candidate.Elective[]): number {
  let hash = electives.length;
  for (let i = 0; i < electives.length; i++) hash = (hash * 31 + electives[i].students + i) | 0;
  return hash;
}

function measure(fn: () => number): number {
  let iterations = 1;
  for (;;) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) sink = (sink + fn()) | 0;
    const elapsed = performance.now() - start;
    if (elapsed >= TARGET_MS || iterations >= 1 << 20) break;
    iterations = Math.min(
      1 << 20,
      Math.max(iterations * 2, Math.ceil((iterations * TARGET_MS) / Math.max(elapsed, 0.1))),
    );
  }
  const start = performance.now();
  for (let i = 0; i < iterations; i++) sink = (sink + fn()) | 0;
  return ((performance.now() - start) * 1e6) / iterations;
}

function median(values: number[]): number {
  return [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
}

const rows = [];
for (const semester of SEMESTERS) {
  const electives = candidate.semesterDatasets[semester].electives;
  const keys = benchKeystrokes(semester);
  const cases = [
    {
      name: "cold statistics",
      run: (api: typeof candidate) => {
        const stats = api.getStats(electives.slice());
        return stats.totalStudents + stats.totalElectives;
      },
    },
    {
      name: "cold opening cutoff list",
      run: (api: typeof candidate) =>
        consume(api.filterElectives(electives.slice(), "all", "all", "", "cutoff", "asc")),
    },
    {
      name: "cold first search",
      run: (api: typeof candidate) =>
        consume(api.filterElectives(electives.slice(), "all", "all", "machine", "cutoff", "asc")),
    },
    {
      name: "warm typing stream",
      run: (api: typeof candidate) => {
        let hash = 0;
        for (const query of keys)
          hash =
            (hash * 31 +
              consume(api.filterElectives(electives, "all", "all", query, "cutoff", "asc"))) |
            0;
        return hash;
      },
    },
    {
      name: "warm palette stream",
      run: (api: typeof candidate) => {
        let hash = 0;
        for (const query of keys)
          hash = (hash * 31 + consume(api.searchTopK(electives, query, 8))) | 0;
        return hash;
      },
    },
    {
      name: "warm sort cycle",
      run: (api: typeof candidate) => {
        let hash = 0;
        for (const field of ["name", "cutoff", "students"] as const)
          for (const order of ["asc", "desc"] as const)
            hash =
              (hash * 31 +
                consume(api.filterElectives(electives, "all", "all", "", field, order))) |
              0;
        return hash;
      },
    },
  ];
  for (const task of cases) {
    const before = () => task.run(baseline);
    const after = () => task.run(candidate);
    if (before() !== after()) throw new Error(`Checksum mismatch: ${semester} ${task.name}`);
    for (let i = 0; i < 30; i++) {
      before();
      after();
    }
    const beforeNs = [];
    const afterNs = [];
    for (let i = 0; i < REPEATS; i++) {
      if (i % 2 === 0) {
        beforeNs.push(measure(before));
        afterNs.push(measure(after));
      } else {
        afterNs.push(measure(after));
        beforeNs.push(measure(before));
      }
    }
    rows.push({
      semester,
      case: task.name,
      beforeNs,
      afterNs,
      beforeMedianNs: median(beforeNs),
      afterMedianNs: median(afterNs),
      speedup: median(beforeNs) / median(afterNs),
    });
  }
}
process.stdout.write(
  JSON.stringify(
    {
      runtime: `Bun ${process.versions.bun}`,
      cpu: cpus()[0].model,
      baselineSourceSha256: createHash("sha256")
        .update(readFileSync(resolve(baselinePath, "lib/electives.ts")))
        .digest("hex"),
      candidateSourceSha256: createHash("sha256")
        .update(readFileSync(resolve("lib/electives.ts")))
        .digest("hex"),
      repeats: REPEATS,
      targetMs: TARGET_MS,
      baselinePath,
      sink,
      rows,
    },
    null,
    2,
  ) + "\n",
);
