/** Run with `bun run bench:ui`. Baseline dependencies are installed only in an
 * ignored benchmark fixture, never added to the application manifest. */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { cpus } from "node:os";
import path from "node:path";
import { env } from "node:process";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const baselineHead = "bdb14cddea880bbd3f03c9e568cca4a0c34f2b56";
const root = process.cwd();
const fixtureRoot = path.join(root, "node_modules/.cache");
mkdirSync(fixtureRoot, { recursive: true });
const fixture = mkdtempSync(path.join(fixtureRoot, "elective-ui-baseline-"));
writeFileSync(
  path.join(fixture, "package.json"),
  JSON.stringify({
    private: true,
    type: "module",
    dependencies: { clsx: "2.1.1", "class-variance-authority": "0.7.1" },
  }),
);
execFileSync("bun", ["install", "--cwd", fixture, "--prefer-offline", "--ignore-scripts"], {
  stdio: ["ignore", "ignore", "inherit"],
});
for (const [source, target] of [
  ["lib/utils.ts", "utils.ts"],
  ["components/ui/badge.tsx", "badge.tsx"],
]) {
  const code = execFileSync("git", ["show", `${baselineHead}:${source}`], {
    cwd: root,
    encoding: "utf8",
  }).replace("@/lib/utils", "./utils");
  writeFileSync(path.join(fixture, target), code);
}
execFileSync(
  "bun",
  [
    "build",
    path.join(fixture, "utils.ts"),
    path.join(fixture, "badge.tsx"),
    "--target=node",
    "--packages=external",
    "--outdir",
    fixture,
  ],
  {
    stdio: "ignore",
  },
);
const baselineUtils: { cn: typeof cn } = await import(path.join(fixture, "utils.js"));
const baselineBadge: { Badge: typeof Badge } = await import(path.join(fixture, "badge.js"));

type ClassInputs = Parameters<typeof cn>;
interface Workload {
  name: string;
  baseline: (index: number) => unknown;
  candidate: (index: number) => unknown;
  iterations: number;
}

const classInputs: [string, ClassInputs][] = [
  ["classes/small", ["h-5", "gap-1"]],
  ["classes/typical", ["w-fit h-9", ["flex", false, { "gap-4": true }], "w-full"]],
  [
    "classes/large",
    [Array.from({ length: 64 }, (_, i) => [`course-${i}`, { [`selected-${i}`]: i % 2 === 0 }])],
  ],
  [
    "classes/adversarial",
    [
      Array.from({ length: 128 }, (_, i) => [null, false, [`px-${i % 8}`, `hover:px-${i % 4}`]]),
      Object.fromEntries(Array.from({ length: 128 }, (_, i) => [`course-${i}`, i % 3])),
      "px-4 hover:px-2",
    ],
  ],
];
const workloads: Workload[] = classInputs.map(([name, inputs]) => {
  assert.equal(cn(...inputs), baselineUtils.cn(...inputs), name);
  return {
    name,
    baseline: () => baselineUtils.cn(...inputs),
    candidate: () => cn(...inputs),
    iterations: 25000,
  };
});
const changingInputs: ClassInputs[] = Array.from({ length: 2048 }, (_, i) => [
  "w-fit h-9 px-2",
  ["flex", { "gap-4": i % 2 === 0 }],
  `course-${i} px-${i % 8} w-full`,
]);
for (const inputs of changingInputs) assert.equal(cn(...inputs), baselineUtils.cn(...inputs));
workloads.push({
  name: "classes/changing-uncached",
  baseline: (i) => baselineUtils.cn(...changingInputs[i % changingInputs.length]),
  candidate: (i) => cn(...changingInputs[i % changingInputs.length]),
  iterations: 4096,
});

// Exercise every retained variant, null/default behavior and caller overrides
// before timing the two variants rendered by the dashboard and Slot composition.
const variants = [
  undefined,
  null,
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] satisfies Parameters<typeof Badge>[0]["variant"][];
for (const variant of variants) {
  for (const className of [undefined, "cursor-pointer px-3"]) {
    const props = { variant, className };
    assert.equal(
      renderToStaticMarkup(createElement(Badge, props, "OE")),
      renderToStaticMarkup(createElement(baselineBadge.Badge, props, "OE")),
    );
  }
}
for (const variant of ["secondary", "outline"] satisfies Parameters<typeof Badge>[0]["variant"][]) {
  const props = { variant };
  workloads.push({
    name: `badge/${variant}`,
    baseline: () => renderToStaticMarkup(createElement(baselineBadge.Badge, props, "OE")),
    candidate: () => renderToStaticMarkup(createElement(Badge, props, "OE")),
    iterations: 500,
  });
}
const composed = { asChild: true, variant: "outline" } satisfies Parameters<typeof Badge>[0];
const child = createElement("a", { href: "/course", rel: "noreferrer" }, "Details");
workloads.push({
  name: "badge/asChild",
  baseline: () => renderToStaticMarkup(createElement(baselineBadge.Badge, composed, child)),
  candidate: () => renderToStaticMarkup(createElement(Badge, composed, child)),
  iterations: 500,
});

let sink: unknown;
function measure(run: (index: number) => unknown, iterations: number) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) sink = run(i);
  return ((performance.now() - start) * 1e6) / iterations;
}

function stats(samples: number[]) {
  const sorted = [...samples].sort((a, b) => a - b);
  const at = (p: number) => sorted[Math.floor((sorted.length - 1) * p)];
  return { median_ns: at(0.5), p95_ns: at(0.95), min_ns: at(0), max_ns: at(1) };
}

const sampleCount = 41;
const results = [];
for (const workload of workloads) {
  assert.deepEqual(workload.candidate(0), workload.baseline(0), workload.name);
  for (let warmup = 0; warmup < 4; warmup++) {
    measure(workload.baseline, workload.iterations);
    measure(workload.candidate, workload.iterations);
  }
  const before: number[] = [];
  const after: number[] = [];
  const paired: number[] = [];
  for (let sample = 0; sample < sampleCount; sample++) {
    let baseline: number;
    let candidate: number;
    if (sample % 2 === 0) {
      baseline = measure(workload.baseline, workload.iterations);
      candidate = measure(workload.candidate, workload.iterations);
    } else {
      candidate = measure(workload.candidate, workload.iterations);
      baseline = measure(workload.baseline, workload.iterations);
    }
    before.push(baseline);
    after.push(candidate);
    paired.push(candidate / baseline);
  }
  results.push({
    name: workload.name,
    iterations: workload.iterations,
    baseline: stats(before),
    candidate: stats(after),
    paired_median_ratio: stats(paired).median_ns,
    samples: { baseline: before, candidate: after },
  });
  console.error(
    `${workload.name}: baseline ${stats(before).median_ns.toFixed(0)} ns, candidate ${stats(after).median_ns.toFixed(0)} ns`,
  );
}
assert.notEqual(sink, undefined);
console.log(
  JSON.stringify(
    {
      baseline_head: baselineHead,
      runtime: process.versions,
      platform: `${process.platform}/${process.arch}`,
      cpu: cpus()[0]?.model,
      react: JSON.parse(readFileSync(path.join(root, "node_modules/react/package.json"), "utf8"))
        .version,
      node_env: env.NODE_ENV ?? "development",
      warmup_batches: 4,
      samples_per_implementation: sampleCount,
      alternating_order: true,
      results,
    },
    null,
    2,
  ),
);
