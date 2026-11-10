# Performance hillclimb, 2026-11-10

Baseline: fork `main` at `60b3c1186d4f93b27c2da8e57a3a994127bf913c`.
Branch: `perf/hillclimb-20261110`. The original checkout's security edits were
left in place. No dependency versions, datasets, CSS, or visual design changed.

## Retained changes

1. Put the shared elective card behind a client component boundary. Next still
   renders all 139 opening cards into HTML, but the React Server Component
   payload carries card props instead of repeating their entire element trees.
   Move presentation helpers into a data-free module so the boundary does not
   pull the query engine and semester JSON into its initial dependency graph.
2. Compose each static card class combination once per module, including the
   highlighted variant. Preserve StyleX's override resolution.
3. Disable prefetch on the two dashboard links in the shared header. On the
   dashboard, these were fetching another copy of the current page's RSC data.
   Links and FAQ prefetch continue to work.
4. Build sort permutations when their field is first requested and character
   bitmaps on the first search. Cache full unfiltered orders and return copies.
   Statistics and opening lists avoid building unrelated indexes.

The first lazy-sort candidate made warm sixth-semester sort cycles about 10%
slower. It was superseded by the cached-copy implementation, which improves
those cycles by about 1.8x. Earlier query results remain in the evidence folder.

## Production payload and browser results

Same machine, Next production servers, Chrome 157, five alternating pairs of
dashboard navigations at 1280 by 800. Assets and servers were warm. These are
local lab measurements without CPU or network throttling, not field Web Vitals.
DOM-ready is navigation start to `domContentLoadedEventEnd`.

| Measurement                                        |  Baseline |   Final |
| -------------------------------------------------- | --------: | ------: |
| Generated HTML, bytes                              | 1,181,961 | 574,954 |
| Served HTML body over local HTTP, compressed bytes |    37,149 |  25,263 |
| Generated HTML with `gzipSync`, bytes              |    44,795 |  29,542 |
| Generated HTML with Brotli, bytes                  |    20,560 |  15,037 |
| Opening cards present in HTML                      |       139 |     139 |
| Redundant dashboard prefetch body, decoded bytes   |   596,147 |       0 |
| Median DOM-ready, ms                               |      75.1 |    54.4 |
| Median observed LCP, ms                            |       232 |     160 |

HTML shrank 51.4% before compression and 32.0% as served by local Next HTTP.
Total settled JavaScript was essentially unchanged, about 649 KB to 650 KB
decoded. Browser paint timings vary substantially; payload reductions are the
more reliable result. No field INP or Lighthouse score was collected.

Three alternating pairs of browser input trials, each with three repetitions
of five queries, checked the expected result counts. Median synthetic input to
DOM commit for the broad `a` query went from 18.4 to 14.5 ms. Other queries were
similar. This probe measures DOM commit, not presentation latency or INP.

Desktop and mobile-width scroll probes both retained a 16.7 ms median animation
frame interval. The final build had no frames over 50 ms in either 89-interval
probe, and the frost returned after scrolling. These are smoke measurements,
not a physical phone/GPU acceptance test.

## Query measurements against this baseline

`bench/hillclimb.ts` compares the exact baseline engine with the candidate in
one Bun process. It verifies result checksums, warms both sides, alternates
measurement order, and retains all seven samples per side. Cold cases use fresh
dataset arrays, including their allocation cost. Results below are median
microseconds per operation, or per full stream/cycle where named.

| Workload                 | VI before | VI after | VII before | VII after |
| ------------------------ | --------: | -------: | ---------: | --------: |
| Cold statistics          |    143.05 |    26.73 |     315.41 |     62.48 |
| Cold opening cutoff list |    149.27 |    43.03 |     309.35 |     90.06 |
| Cold first search        |    147.90 |   100.11 |     306.61 |    193.89 |
| Warm typing stream       |     46.57 |    47.81 |      78.37 |     80.98 |
| Warm palette stream      |     68.66 |    69.88 |     117.62 |    119.92 |
| Warm six-sort cycle      |      5.05 |     2.76 |       9.33 |      5.10 |

Cold statistics improve about 5x, opening lists 3.4x, first search 1.5x, and
warm sort cycles 1.8x. Warm typing/palette medians were 2-3% slower in the final
run and varied around parity in earlier rounds. No hot-search speedup is claimed.

Host: Ryzen 5 5600G, Linux x64, 12 logical CPUs, installed Bun 1.4.4 and Node
24.22.1. Both sides use the same runtime and dependencies. The repository's Bun
1.4.2 declaration is preserved. Query evidence includes engine SHA-256 hashes.

## Verification and reproduction

- `bun run bench:verify`: 106,711 scenarios passed, including 30 new tests
  confirming that mutating returned sorted arrays preserves retained and future
  query results.
- Production build, TypeScript, lint, formatting, and Git whitespace checks.
  Lint retains existing warnings; the build retains its existing StyleX/Babel
  loader warning.
- All 139 rendered cards have exactly the same markup hash before and after.
  First-card descendant geometry and computed styling match at 1280 by 800 and
  390 by 844, with no horizontal overflow.
- Browser checks: type filtering to 37 OEs, semester switching to 258 electives,
  department filtering to 21 AAE electives, Ctrl+K focus and eight initial
  results, and selection of offscreen IIE 4311 scrolling the card into view.
- Original security edits remain untouched. No upstream writes or deployment.

With a checkout of the baseline commit installed using the same frozen lock:

```sh
bun install --frozen-lockfile
bun run bench:hillclimb /absolute/path/to/baseline > query-results.json
bun run bench:verify
bun run typecheck
bun run lint
bun run format:check
bun run build
```

For browser reproduction, serve both production builds on separate ports.
Alternate navigation order and run `bench/load-probe.js`,
`bench/browser-probe.js`, and `bench/scroll-probe.js` in each page's console.
The input probe expects the unfiltered sixth-semester list. Browser viewport
emulation changes CSS dimensions; it does not emulate physical mobile hardware.

Raw measurements and intermediate build logs are under
`artifacts/perf-hillclimb/`. The final query run is `query-verified.json`;
`final-browser-loads.json`, `final-browser-interactions.json`, `geometry.json`,
`scroll.json`, and `payload.json` contain the browser and payload evidence.
