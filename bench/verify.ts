/**
 * Differential test: the optimized query engine in `lib/electives.ts` must return
 * results identical (by object identity and order) to the frozen reference
 * implementation in `bench/reference-impl.ts`, for every scenario in the matrix.
 *
 *   bun run bench/verify.ts
 *
 * Exits non-zero on the first class of mismatch, printing a minimal repro.
 */
import {
  semesterDatasets,
  filterElectives,
  getElectiveTypes,
  getDepartments,
  getStats,
  searchTopK,
} from "@/lib/electives";
import {
  refFilterElectives,
  refGetElectiveTypes,
  refGetDepartments,
  refGetStats,
  refCommandSearch,
} from "./reference-impl";
import {
  allScenarios,
  searchQueries,
  benchKeystrokes,
  separatorQueries,
  SEMESTERS,
  SORT_BYS,
  SORT_ORDERS,
  type Scenario,
} from "./scenarios";

let checked = 0;
const failures: string[] = [];

function fail(message: string) {
  if (failures.length < 20) failures.push(message);
}

/**
 * Structural equality, used instead of comparing `JSON.stringify` output.
 *
 * `JSON.stringify` is the wrong tool for an assertion this file's guarantees
 * rest on: it maps both `NaN` and `Infinity` to `null`, so a stats object whose
 * `lowestCutoff` is `Infinity` (which is what an empty dataset produces) would
 * compare equal to one holding `null` or `NaN`; it drops `undefined`-valued
 * properties entirely, hiding a missing field; and it serialises in property
 * insertion order, so two logically equal objects built in a different order
 * compare unequal. `Object.is` at the leaves keeps all three distinctions.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const aKeys = Object.keys(a as Record<string, unknown>);
  const bKeys = Object.keys(b as Record<string, unknown>);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (!Object.hasOwn(b as Record<string, unknown>, key)) return false;
    if (!deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
      return false;
    }
  }
  return true;
}

function describe(s: Scenario) {
  return `semester=${s.semester} type=${JSON.stringify(s.type)} dept=${JSON.stringify(
    s.department,
  )} search=${JSON.stringify(s.search)} sortBy=${s.sortBy} sortOrder=${s.sortOrder}`;
}

for (const semester of SEMESTERS) {
  const electives = semesterDatasets[semester].electives;

  // --- Derived-list helpers -------------------------------------------------
  const expectedTypes = refGetElectiveTypes(electives);
  const actualTypes = getElectiveTypes(electives);
  if (!deepEqual(actualTypes, expectedTypes)) {
    fail(`getElectiveTypes(${semester}): ${JSON.stringify(actualTypes)} !== ${JSON.stringify(expectedTypes)}`);
  }

  const expectedDepts = refGetDepartments(electives);
  const actualDepts = getDepartments(electives);
  if (!deepEqual(actualDepts, expectedDepts)) {
    fail(`getDepartments(${semester}): ${JSON.stringify(actualDepts)} !== ${JSON.stringify(expectedDepts)}`);
  }

  // --- Stats ----------------------------------------------------------------
  const expectedStats = refGetStats(electives);
  const actualStats = getStats(electives);
  if (!deepEqual(actualStats, expectedStats)) {
    fail(
      `getStats(${semester}):\n  actual   ${JSON.stringify(actualStats)}\n  expected ${JSON.stringify(
        expectedStats,
      )}`,
    );
  }

  // --- The full filter/sort matrix -----------------------------------------
  for (const scenario of allScenarios(semester)) {
    const expected = refFilterElectives(
      electives,
      scenario.type,
      scenario.department,
      scenario.search,
      scenario.sortBy,
      scenario.sortOrder,
    );
    const actual = filterElectives(
      electives,
      scenario.type,
      scenario.department,
      scenario.search,
      scenario.sortBy,
      scenario.sortOrder,
    );
    checked++;

    if (actual.length !== expected.length) {
      fail(`length ${actual.length} !== ${expected.length} for ${describe(scenario)}`);
      continue;
    }
    for (let i = 0; i < expected.length; i++) {
      // Identity comparison: same object, same slot. Strictest possible check.
      if (actual[i] !== expected[i]) {
        fail(
          `index ${i}: got ${actual[i].code}/${actual[i].type}/${actual[i].name} ` +
            `expected ${expected[i].code}/${expected[i].type}/${expected[i].name} for ${describe(scenario)}`,
        );
        break;
      }
    }

    // The returned array must be a fresh array the caller can mutate, never the
    // internal dataset array — the old implementation always copied.
    if (actual === electives) {
      fail(`filterElectives returned the dataset array itself for ${describe(scenario)}`);
    }
  }

  // --- Command palette (top-K search) --------------------------------------
  // `searchTopK` must reproduce the palette's old "filter everything, then take
  // the first 8 in dataset order" exactly — same objects, same order.
  for (const query of searchQueries(semester)) {
    for (const k of [1, 8, 50]) {
      const expected = refCommandSearch(electives, query, k);
      const actual = searchTopK(electives, query, k);
      checked++;
      if (actual.length !== expected.length) {
        fail(
          `searchTopK(${JSON.stringify(query)}, ${k}) length ${actual.length} !== ${expected.length} in ${semester}`,
        );
        continue;
      }
      for (let i = 0; i < expected.length; i++) {
        if (actual[i] !== expected[i]) {
          fail(`searchTopK(${JSON.stringify(query)}, ${k}) index ${i} differs in ${semester}`);
          break;
        }
      }
    }
  }

  // --- React key / DOM id uniqueness ---------------------------------------
  // The grid keys cards, and ids DOM nodes, by `code`+`type`. If that pair is
  // ever non-unique React silently renders duplicate keys and `getElementById`
  // picks the wrong card to scroll to. Assert it here so a future data update
  // fails this test rather than the UI.
  {
    const seen = new Set<string>();
    for (const e of electives) {
      const key = `${e.code}|${e.type}`;
      if (seen.has(key)) fail(`duplicate (code,type) key ${JSON.stringify(key)} in ${semester}`);
      seen.add(key);
    }
  }
}

/* -------------------------------------------------------------------------- */
/*  Order-dependence                                                          */
/*                                                                            */
/*  The optimized engine carries state across calls (the incremental-narrowing */
/*  cache and the stamped membership mask), so a scenario passing in isolation */
/*  proves nothing about it passing after some other query. These passes run   */
/*  the same assertions under call orders designed to break that state.        */
/* -------------------------------------------------------------------------- */

function checkOne(semester: (typeof SEMESTERS)[number], s: Scenario, context: string) {
  const electives = semesterDatasets[semester].electives;
  const expected = refFilterElectives(electives, s.type, s.department, s.search, s.sortBy, s.sortOrder);
  const actual = filterElectives(electives, s.type, s.department, s.search, s.sortBy, s.sortOrder);
  checked++;
  if (actual.length !== expected.length) {
    fail(`[${context}] length ${actual.length} !== ${expected.length} for ${describe(s)}`);
    return;
  }
  for (let i = 0; i < expected.length; i++) {
    if (actual[i] !== expected[i]) {
      fail(`[${context}] index ${i} differs for ${describe(s)}`);
      return;
    }
  }
}

// Pass A: type each query one character at a time — the path that exercises the
// incremental-narrowing tier, which only triggers when a query extends the last.
for (const semester of SEMESTERS) {
  for (const q of benchKeystrokes(semester)) {
    for (const sortBy of SORT_BYS) {
      checkOne(semester, { semester, type: "all", department: "all", search: q, sortBy, sortOrder: "asc" }, "typing");
    }
  }
}

// Pass B: alternate between the two semesters on every call, so each dataset's
// cached state is always stale by the time it is consulted again.
{
  const sixthQueries = benchKeystrokes("sixth");
  const seventhQueries = benchKeystrokes("seventh");
  const len = Math.max(sixthQueries.length, seventhQueries.length);
  for (let i = 0; i < len; i++) {
    checkOne(
      "sixth",
      { semester: "sixth", type: "all", department: "all", search: sixthQueries[i % sixthQueries.length], sortBy: "cutoff", sortOrder: "asc" },
      "interleaved",
    );
    checkOne(
      "seventh",
      { semester: "seventh", type: "all", department: "all", search: seventhQueries[i % seventhQueries.length], sortBy: "cutoff", sortOrder: "asc" },
      "interleaved",
    );
  }
}

// Pass C: a deterministic shuffle of the whole matrix, so no scenario is ever
// preceded by the scenario it was preceded by in the ordered pass above.
for (const semester of SEMESTERS) {
  const scenarios = allScenarios(semester);
  // xorshift32 with a fixed seed: reproducible, and a failure is always replayable.
  let state = 0x9e3779b9;
  for (let i = scenarios.length - 1; i > 0; i--) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    const j = (state >>> 0) % (i + 1);
    [scenarios[i], scenarios[j]] = [scenarios[j], scenarios[i]];
  }
  for (const s of scenarios) checkOne(semester, s, "shuffled");
}

// Pass D: repeat the identical query many times in a row, then a different one,
// to exercise the cache-hit path and the mask's generation stamp.
for (const semester of SEMESTERS) {
  for (const search of ["e", "engineering", "zzz", "e", ""]) {
    for (let rep = 0; rep < 3; rep++) {
      for (const sortOrder of SORT_ORDERS) {
        checkOne(semester, { semester, type: "all", department: "all", search, sortBy: "name", sortOrder }, "repeat");
      }
    }
  }
}

// Pass E: prime the search cache with a plain query, then immediately issue one
// that *extends* it with the haystack separator. An engine that concatenates
// fields must not let the incremental path match across a field boundary — this
// is the exact sequence that caught it doing so.
for (const semester of SEMESTERS) {
  for (const q of separatorQueries()) {
    for (let cut = 0; cut < q.length; cut++) {
      const prime = q.slice(0, cut);
      if (prime.length > 0) {
        checkOne(semester, { semester, type: "all", department: "all", search: prime, sortBy: "name", sortOrder: "asc" }, "sep-prime");
      }
      checkOne(semester, { semester, type: "all", department: "all", search: q, sortBy: "name", sortOrder: "asc" }, "sep-extend");
    }
  }
}

if (failures.length > 0) {
  console.error(`\n❌ ${failures.length} mismatch class(es) after ${checked} scenarios:\n`);
  for (const f of failures) console.error("  • " + f);
  process.exit(1);
}

console.log(`✅ optimized engine matches reference on all ${checked.toLocaleString()} scenarios`);
