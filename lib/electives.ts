import sixthSemesterCompact from "@/data/sixth-semester.compact.json";
import seventhSemesterCompact from "@/data/seventh-semester.compact.json";

export type SemesterId = "sixth" | "seventh";
export type ElectiveType =
  | "OE"
  | "PE I"
  | "PE II"
  | "OE III"
  | "PE III"
  | "PE IV"
  | "PE V"
  | "PE VI"
  | "PE VII";

export interface Elective {
  type: ElectiveType;
  typeLabel: string;
  code: string;
  name: string;
  department: string;
  lowestCGPA: number;
  highestCGPA: number;
  students: number;
}

export interface SemesterDataset {
  metadata: {
    title: string;
    academicYear: string;
    semester: string;
  };
  electives: Elective[];
}

/**
 * The on-disk shape of `data/*.compact.json`: columnar, with the three
 * low-cardinality string fields dictionary-encoded. See `scripts/encode-data.ts`.
 */
interface CompactDataset {
  metadata: { title: string; academicYear: string; semester: string };
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

/** Rebuilds the row-oriented `Elective[]` the rest of the app expects. */
function decodeDataset(compact: CompactDataset): SemesterDataset {
  const {
    count,
    types,
    typeLabels,
    departments,
    typeCodes,
    typeLabelCodes,
    departmentCodes,
    codes,
    names,
    lowestCGPA,
    highestCGPA,
    students,
  } = compact;

  const electives = new Array<Elective>(count);
  for (let i = 0; i < count; i++) {
    electives[i] = {
      type: types[typeCodes[i]] as ElectiveType,
      typeLabel: typeLabels[typeLabelCodes[i]],
      code: codes[i],
      name: names[i],
      department: departments[departmentCodes[i]],
      lowestCGPA: lowestCGPA[i],
      highestCGPA: highestCGPA[i],
      students: students[i],
    };
  }

  return { metadata: compact.metadata, electives };
}

const decoded: Partial<Record<SemesterId, SemesterDataset>> = {};

function datasetOf(id: SemesterId, compact: CompactDataset): SemesterDataset {
  return (decoded[id] ??= decodeDataset(compact));
}

/**
 * Decoded lazily, per semester, via getters. Opening the page on one semester
 * never materializes the other's electives — and because the getter memoizes,
 * `semesterDatasets.seventh.electives` keeps a stable identity across renders,
 * which the query index (keyed on that array) and `useMemo` both rely on.
 */
export const semesterDatasets: Record<SemesterId, SemesterDataset> = {
  get sixth() {
    return datasetOf("sixth", sixthSemesterCompact as CompactDataset);
  },
  get seventh() {
    return datasetOf("seventh", seventhSemesterCompact as CompactDataset);
  },
};

export type SortBy = "name" | "cutoff" | "students" | "difficulty";
export type SortOrder = "asc" | "desc";

/**
 * Statistics for a dataset. Every field is `readonly` because `getStats` hands
 * back the index's own memoized object rather than a fresh one — mutating it
 * would corrupt every later read.
 */
export interface ElectiveStats {
  readonly totalElectives: number;
  readonly typeCounts: readonly Readonly<{ type: ElectiveType; count: number }>[];
  readonly oeCount: number;
  readonly programElectiveCount: number;
  readonly lowestCutoff: number;
  readonly highestCutoff: number;
  readonly totalStudents: number;
  readonly departments: number;
}

/** The mutable shape used while building the stats; narrowed to the readonly view on the way out. */
interface MutableElectiveStats {
  totalElectives: number;
  typeCounts: Array<{ type: ElectiveType; count: number }>;
  oeCount: number;
  programElectiveCount: number;
  lowestCutoff: number;
  highestCutoff: number;
  totalStudents: number;
  departments: number;
}

/* -------------------------------------------------------------------------- */
/*  Query engine                                                              */
/*                                                                            */
/*  Every dataset is static and fully known before the first query, so all the  */
/*  per-query work the previous implementation repeated — lowercasing three     */
/*  strings per elective per keystroke, and running a comparison sort with a JS */
/*  callback over every result set — is hoisted into an index built once.       */
/*                                                                            */
/*  A query then costs:                                                        */
/*    · sorting:  none. Results are emitted by walking a precomputed stable     */
/*                permutation, so the output order is produced, not computed.   */
/*    · search:   a bitmap intersection on the two rarest characters of the     */
/*                query to get candidates, then one `indexOf` per candidate     */
/*                against a pre-lowercased haystack — and only a rescan of the  */
/*                previous hits when the query merely extends the previous one. */
/*    · filters:  integer comparisons against dictionary-coded type/dept.       */
/*                                                                            */
/*  `bench/verify.ts` proves this returns results identical (by object identity */
/*  and order) to the previous implementation across ~51k scenarios;            */
/*  `bench/bench.ts` measures the difference.                                   */
/* -------------------------------------------------------------------------- */

/**
 * Field separator inside the search haystack. Each field is lowercased
 * independently and then joined, so a substring match on the haystack is
 * equivalent to a substring match on one of the three fields: a match spanning
 * two fields would have to contain the separator, and `searchHits` routes any
 * query containing it to an exact per-field fallback. NUL is used rather than a
 * space so ordinary multi-word queries ("machine learning") stay on the fast
 * path, and it is built via `fromCharCode` to keep this file plain ASCII.
 */
const SEP = String.fromCharCode(0);

/**
 * At or below this many search hits it is cheaper to sort the hits by their
 * precomputed rank than to walk all `n` slots of the permutation.
 *
 * Measured on the benchmark's typing stream at n=258: 48µs with this path
 * disabled, ~42µs anywhere in 8..64, and 139µs with it unbounded (the insertion
 * sort is quadratic). Anything in the middle of that plateau is equivalent, so
 * the exact value is not load-bearing — only staying off both extremes is.
 * `bench/verify.ts` checks both paths agree on either side of the threshold.
 */
const RANK_SORT_MAX = 24;

/** `localeCompare()` with no arguments is specified to be exactly this collator. */
const collator = new Intl.Collator();

interface Ordering {
  /** Stable permutation of elective indices; ties broken by original index. */
  perm: Int32Array;
  /** rank[i] = position of elective i within `perm`. Built on first use. */
  rank: Int32Array | null;
}

interface ElectiveIndex {
  electives: Elective[];
  n: number;

  /** Distinct types in first-appearance order, matching the original Set order. */
  types: ElectiveType[];
  /** Distinct departments in default (code-unit) sort order. */
  departments: string[];
  stats: ElectiveStats;

  /** Dictionary codes, so filtering is an integer compare rather than a string one. */
  typeCode: Int32Array;
  deptCode: Int32Array;
  typeId: Map<string, number>;
  deptId: Map<string, number>;

  /** `name.toLowerCase() + SEP + code.toLowerCase() + SEP + department.toLowerCase()` */
  haystack: string[];

  /** [ascending, descending] permutations per sort key. */
  byName: [Ordering, Ordering];
  byCutoff: [Ordering, Ordering];
  byStudents: [Ordering, Ordering];

  /** charCode -> bitmap of electives whose haystack contains that character. */
  charBitmap: Map<number, Uint32Array>;
  /** charCode -> how many electives contain it, for rarest-first pruning. */
  charFreq: Map<number, number>;
  words: number;

  /**
   * Single-entry cache enabling incremental narrowing as the user types.
   * `hits`/`spare` are double-buffered so a query never allocates a hit list:
   * the previous hits stay readable in `hits` while the new ones are written
   * into `spare`, then the two are swapped.
   */
  lastQuery: string;
  hits: Int32Array;
  spare: Int32Array;
  /** Number of valid entries in `hits`; -1 means "no active search". */
  hitCount: number;

  /** Membership mask for the many-hits path, with a per-index generation stamp. */
  mask: Int32Array;
  maskStamp: number;
  /** Scratch buffer for the few-hits path. */
  picked: Int32Array;
  scratchBitmap: Uint32Array;
}

const indexCache = new WeakMap<Elective[], ElectiveIndex>();

function popcount(v: number): number {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return (((v + (v >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
}

/**
 * Builds a stable permutation of `0..n-1`. `compare` may return 0 for ties; the
 * original-index tiebreak reproduces `Array.prototype.sort`'s stability, and
 * that is precisely what makes "sort the whole dataset once, then filter in that
 * order" equivalent to "filter, then sort the subset".
 */
function stablePermutation(n: number, compare: (a: number, b: number) => number): Int32Array {
  const idx = new Array<number>(n);
  for (let i = 0; i < n; i++) idx[i] = i;
  idx.sort((a, b) => compare(a, b) || a - b);
  return Int32Array.from(idx);
}

/**
 * Descending order is not the reverse of ascending: a stable sort with a negated
 * comparator still leaves tied elements in ascending original-index order. So
 * reverse the *runs* of equal keys while preserving order within each run, which
 * is exactly what the previous `.sort((a, b) => (ka - kb) * -1)` produced — in
 * O(n) rather than a second n·log n sort.
 */
function descendingFrom(asc: Int32Array, tied: (a: number, b: number) => boolean): Int32Array {
  const n = asc.length;
  const out = new Int32Array(n);
  let w = 0;
  let end = n;
  while (end > 0) {
    let start = end - 1;
    while (start > 0 && tied(asc[start - 1], asc[start])) start--;
    for (let k = start; k < end; k++) out[w++] = asc[k];
    end = start;
  }
  return out;
}

function makeOrdering(perm: Int32Array): Ordering {
  return { perm, rank: null };
}

function rankOf(ordering: Ordering): Int32Array {
  let rank = ordering.rank;
  if (rank === null) {
    const perm = ordering.perm;
    rank = new Int32Array(perm.length);
    for (let p = 0; p < perm.length; p++) rank[perm[p]] = p;
    ordering.rank = rank;
  }
  return rank;
}

function buildIndex(electives: Elective[]): ElectiveIndex {
  const n = electives.length;

  const types: ElectiveType[] = [];
  const typeId = new Map<string, number>();
  const deptSeen = new Set<string>();
  const typeCode = new Int32Array(n);
  const haystack = new Array<string>(n);
  const cutoffKey = new Float64Array(n);
  const studentsKey = new Float64Array(n);
  const names = new Array<string>(n);

  let totalStudents = 0;
  let lowestCutoff = Infinity;
  let highestCutoff = -Infinity;

  // One pass: dictionary-code the types, collect departments, build haystacks
  // and sort keys, and accumulate every statistic that `getStats` previously
  // recomputed with four extra passes and two array spreads.
  for (let i = 0; i < n; i++) {
    const e = electives[i];

    let tid = typeId.get(e.type);
    if (tid === undefined) {
      tid = types.length;
      types.push(e.type);
      typeId.set(e.type, tid);
    }
    typeCode[i] = tid;

    deptSeen.add(e.department);

    names[i] = e.name;
    haystack[i] =
      e.name.toLowerCase() + SEP + e.code.toLowerCase() + SEP + e.department.toLowerCase();

    const low = e.lowestCGPA;
    cutoffKey[i] = low;
    studentsKey[i] = e.students;
    totalStudents += e.students;
    if (low < lowestCutoff) lowestCutoff = low;
    if (low > highestCutoff) highestCutoff = low;
  }

  // `Array.prototype.sort` with no comparator, i.e. UTF-16 code-unit order —
  // matching the previous `getDepartments`, and deliberately not the collator
  // used for names.
  const departments = [...deptSeen].sort();
  const deptId = new Map<string, number>();
  for (let d = 0; d < departments.length; d++) deptId.set(departments[d], d);
  const deptCode = new Int32Array(n);
  for (let i = 0; i < n; i++) deptCode[i] = deptId.get(electives[i].department)!;

  // --- Sort orders, computed once -------------------------------------------
  const nameAsc = stablePermutation(n, (a, b) => collator.compare(names[a], names[b]));
  const cutoffAsc = stablePermutation(n, (a, b) => cutoffKey[a] - cutoffKey[b]);
  const studentsAsc = stablePermutation(n, (a, b) => studentsKey[a] - studentsKey[b]);

  const byName: [Ordering, Ordering] = [
    makeOrdering(nameAsc),
    makeOrdering(descendingFrom(nameAsc, (a, b) => collator.compare(names[a], names[b]) === 0)),
  ];
  const byCutoff: [Ordering, Ordering] = [
    makeOrdering(cutoffAsc),
    makeOrdering(descendingFrom(cutoffAsc, (a, b) => cutoffKey[a] === cutoffKey[b])),
  ];
  const byStudents: [Ordering, Ordering] = [
    makeOrdering(studentsAsc),
    makeOrdering(descendingFrom(studentsAsc, (a, b) => studentsKey[a] === studentsKey[b])),
  ];

  // --- Character bitmaps for candidate pruning ------------------------------
  const words = (n + 31) >>> 5;
  const charBitmap = new Map<number, Uint32Array>();
  for (let i = 0; i < n; i++) {
    const h = haystack[i];
    const w = i >>> 5;
    const bit = 1 << (i & 31);
    for (let p = 0; p < h.length; p++) {
      const c = h.charCodeAt(p);
      let bm = charBitmap.get(c);
      if (bm === undefined) {
        bm = new Uint32Array(words);
        charBitmap.set(c, bm);
      }
      bm[w] |= bit;
    }
  }
  const charFreq = new Map<number, number>();
  for (const [c, bm] of charBitmap) {
    let count = 0;
    for (let w = 0; w < words; w++) count += popcount(bm[w]);
    charFreq.set(c, count);
  }

  const typeCounts = types.map((type) => ({ type, count: 0 }));
  for (let i = 0; i < n; i++) typeCounts[typeCode[i]].count++;

  let oeCount = 0;
  let programElectiveCount = 0;
  for (const { type, count } of typeCounts) {
    if (type.startsWith("OE")) oeCount += count;
    else if (type.startsWith("PE")) programElectiveCount += count;
  }

  const stats: MutableElectiveStats = {
    totalElectives: n,
    typeCounts,
    oeCount,
    programElectiveCount,
    lowestCutoff,
    highestCutoff,
    totalStudents,
    departments: departments.length,
  };

  return {
    electives,
    n,
    types,
    departments,
    stats,
    typeCode,
    deptCode,
    typeId,
    deptId,
    haystack,
    byName,
    byCutoff,
    byStudents,
    charBitmap,
    charFreq,
    words,
    lastQuery: "",
    hits: new Int32Array(n),
    spare: new Int32Array(n),
    hitCount: -1,
    mask: new Int32Array(n),
    maskStamp: 0,
    picked: new Int32Array(n),
    scratchBitmap: new Uint32Array(words),
  };
}

function getIndex(electives: Elective[]): ElectiveIndex {
  let index = indexCache.get(electives);
  if (index === undefined) {
    index = buildIndex(electives);
    indexCache.set(electives, index);
  }
  return index;
}

/** Publishes the freshly-written `spare` buffer as the current hit list. */
function commitHits(index: ElectiveIndex, query: string, count: number): number {
  const written = index.spare;
  index.spare = index.hits;
  index.hits = written;
  index.lastQuery = query;
  index.hitCount = count;
  return count;
}

/**
 * Search hits for `query` (already lowercased), written into `index.hits` in
 * ascending index order. Returns the hit count, or -1 meaning "no search, every
 * elective matches" so the caller can skip the membership test entirely.
 *
 * Tiers, cheapest first:
 *   0. the query contains the haystack separator — the concatenated haystack is
 *      unsafe for it, so fall back to the exact per-field test. This must be
 *      checked before any tier that consults the haystack, including tier 2;
 *   1. the query repeats the previous one — cached, O(1);
 *   2. the query extends the previous one — rescan only the previous hits, since
 *      substring matching is monotone: matches(q + c) is a subset of matches(q);
 *   3. otherwise — intersect the bitmaps of the query's two rarest characters,
 *      then verify the survivors with one `indexOf` each.
 */
function searchHits(index: ElectiveIndex, query: string): number {
  if (query.length === 0) return -1;
  if (index.hitCount >= 0 && query === index.lastQuery) return index.hitCount;

  const { haystack } = index;
  const out = index.spare;
  let count = 0;

  // Tier 0: a query containing the separator could match across a field boundary
  // in the concatenated haystack, so fall back to the exact per-field test.
  //
  // This is deliberately checked BEFORE tier 2. Tier 2 matches against the
  // haystack too, so leaving this below it let a separator-bearing query that
  // happened to extend the cached query slip through unguarded: priming with
  // "4" and then querying "4\0" returned 12 false positives while the same query
  // on a cold cache correctly returned none.
  if (query.indexOf(SEP) !== -1) {
    const { electives, n } = index;
    for (let i = 0; i < n; i++) {
      const e = electives[i];
      if (
        e.name.toLowerCase().includes(query) ||
        e.code.toLowerCase().includes(query) ||
        e.department.toLowerCase().includes(query)
      ) {
        out[count++] = i;
      }
    }
    return commitHits(index, query, count);
  }

  // Tier 2: incremental narrowing while the user types. Safe to match against the
  // haystack here only because tier 0 has already excluded separator-bearing
  // queries.
  if (
    index.hitCount >= 0 &&
    index.lastQuery.length > 0 &&
    query.length > index.lastQuery.length &&
    query.startsWith(index.lastQuery)
  ) {
    const prev = index.hits;
    const prevCount = index.hitCount;
    for (let k = 0; k < prevCount; k++) {
      const i = prev[k];
      if (haystack[i].indexOf(query) !== -1) out[count++] = i;
    }
    return commitHits(index, query, count);
  }

  // Tier 3: pick the two rarest characters of the query and intersect their
  // bitmaps. Anything matching the query must contain every character of it, so
  // this never prunes a real match; survivors still need an `indexOf` to confirm
  // the characters actually appear contiguously and in order.
  const { charBitmap, charFreq, words } = index;
  let rarest: Uint32Array | null = null;
  let rarestFreq = Infinity;
  let second: Uint32Array | null = null;
  let secondFreq = Infinity;

  for (let p = 0; p < query.length; p++) {
    const c = query.charCodeAt(p);
    const bm = charBitmap.get(c);
    // A character absent from every haystack means nothing can match.
    if (bm === undefined) return commitHits(index, query, 0);
    const freq = charFreq.get(c)!;
    if (freq < rarestFreq) {
      second = rarest;
      secondFreq = rarestFreq;
      rarest = bm;
      rarestFreq = freq;
    } else if (freq < secondFreq && bm !== rarest) {
      second = bm;
      secondFreq = freq;
    }
  }

  const candidates = index.scratchBitmap;
  if (second !== null) {
    for (let w = 0; w < words; w++) candidates[w] = rarest![w] & second[w];
  } else {
    candidates.set(rarest!);
  }

  // A single-character query is answered by its bitmap alone: containing the
  // character *is* matching it, so no verification pass is needed.
  const needsVerify = query.length > 1;
  for (let w = 0; w < words; w++) {
    let bits = candidates[w] | 0;
    const base = w << 5;
    while (bits !== 0) {
      const lowest = bits & -bits;
      const i = base + (31 - Math.clz32(lowest));
      bits ^= lowest;
      if (!needsVerify || haystack[i].indexOf(query) !== -1) out[count++] = i;
    }
  }

  return commitHits(index, query, count);
}

/** Stamps membership of the current hit list without clearing the mask. */
function stampMask(index: ElectiveIndex, hitCount: number): number {
  const mask = index.mask;
  let stamp = index.maskStamp + 1;
  // Cells start at 0, so 0 must never be used as a marker.
  if (stamp > 0x7ffffffe) {
    mask.fill(0);
    stamp = 1;
  }
  index.maskStamp = stamp;
  const hits = index.hits;
  for (let k = 0; k < hitCount; k++) mask[hits[k]] = stamp;
  return stamp;
}

function orderingFor(
  index: ElectiveIndex,
  sortBy: SortBy | undefined,
  sortOrder: SortOrder | undefined,
): Ordering {
  const dir = sortOrder === "desc" ? 1 : 0;
  switch (sortBy) {
    case "cutoff":
    case "difficulty":
      return index.byCutoff[dir];
    case "students":
      return index.byStudents[dir];
    case "name":
    default:
      return index.byName[dir];
  }
}

/**
 * Distinct elective types in first-appearance order.
 *
 * The returned array is the index's own — shared, not copied, so it keeps a
 * stable identity across calls (which `useMemo` and `memo` benefit from).
 * Treat it as read-only.
 */
export function getElectiveTypes(electives: Elective[]): readonly ElectiveType[] {
  return getIndex(electives).types;
}

/** Distinct departments, sorted. Shared and read-only, as `getElectiveTypes`. */
export function getDepartments(electives: Elective[]): readonly string[] {
  return getIndex(electives).departments;
}

/** Dataset-wide statistics, computed once. Shared and read-only. */
export function getStats(electives: Elective[]): ElectiveStats {
  return getIndex(electives).stats;
}

export function filterElectives(
  electives: Elective[],
  type?: string,
  department?: string,
  search?: string,
  sortBy?: SortBy,
  sortOrder?: SortOrder,
): Elective[] {
  const index = getIndex(electives);
  const { n, typeCode, deptCode } = index;

  // "all", undefined and "" all mean "no filter"; an unrecognised value matches
  // nothing, exactly as an equality filter against it would have.
  let wantType = -1;
  if (type && type !== "all") {
    const id = index.typeId.get(type);
    if (id === undefined) return [];
    wantType = id;
  }

  let wantDept = -1;
  if (department && department !== "all") {
    const id = index.deptId.get(department);
    if (id === undefined) return [];
    wantDept = id;
  }

  const hitCount = search ? searchHits(index, search.toLowerCase()) : -1;
  if (hitCount === 0) return [];

  const ordering = orderingFor(index, sortBy, sortOrder);
  const out: Elective[] = [];

  // No search: walk the precomputed order once, keeping whatever passes the two
  // integer filters. It is already sorted, so nothing is compared.
  if (hitCount < 0) {
    const perm = ordering.perm;
    for (let p = 0; p < n; p++) {
      const i = perm[p];
      if (wantType >= 0 && typeCode[i] !== wantType) continue;
      if (wantDept >= 0 && deptCode[i] !== wantDept) continue;
      out.push(electives[i]);
    }
    return out;
  }

  const hits = index.hits;

  // Few hits: sorting them by precomputed rank beats touching all n slots.
  if (hitCount <= RANK_SORT_MAX) {
    const rank = rankOf(ordering);
    const picked = index.picked;
    let m = 0;
    for (let k = 0; k < hitCount; k++) {
      const i = hits[k];
      if (wantType >= 0 && typeCode[i] !== wantType) continue;
      if (wantDept >= 0 && deptCode[i] !== wantDept) continue;
      picked[m++] = i;
    }
    // Insertion sort: `picked` holds at most RANK_SORT_MAX entries.
    for (let a = 1; a < m; a++) {
      const v = picked[a];
      const r = rank[v];
      let b = a - 1;
      while (b >= 0 && rank[picked[b]] > r) {
        picked[b + 1] = picked[b];
        b--;
      }
      picked[b + 1] = v;
    }
    for (let a = 0; a < m; a++) out.push(electives[picked[a]]);
    return out;
  }

  // Many hits: stamp a membership mask and walk the order.
  const mask = index.mask;
  const stamp = stampMask(index, hitCount);
  const perm = ordering.perm;
  for (let p = 0; p < n; p++) {
    const i = perm[p];
    if (mask[i] !== stamp) continue;
    if (wantType >= 0 && typeCode[i] !== wantType) continue;
    if (wantDept >= 0 && deptCode[i] !== wantDept) continue;
    out.push(electives[i]);
  }
  return out;
}

/**
 * The first `k` electives matching `query`, in dataset order — the command
 * palette's shape of search.
 *
 * Equivalent to filtering everything and taking `.slice(0, k)`, but it stops as
 * soon as it has `k` matches instead of scanning the whole dataset to throw most
 * of the work away. It also deliberately does not touch the incremental-narrowing
 * cache: the palette's query and the main list's query are independent pieces of
 * UI state, and letting them share a single-entry cache would make each one
 * evict the other's.
 */
export function searchTopK(electives: Elective[], query: string, k: number): Elective[] {
  if (k <= 0) return [];

  const index = getIndex(electives);
  const { n, haystack } = index;

  if (query.length === 0) return electives.slice(0, k);

  const q = query.toLowerCase();
  const out: Elective[] = [];

  // Separator-bearing queries can't use the concatenated haystack; see `searchHits`.
  if (q.indexOf(SEP) !== -1) {
    for (let i = 0; i < n && out.length < k; i++) {
      const e = electives[i];
      if (
        e.name.toLowerCase().includes(q) ||
        e.code.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
      ) {
        out.push(e);
      }
    }
    return out;
  }

  const { charBitmap, charFreq, words } = index;
  let rarest: Uint32Array | null = null;
  let rarestFreq = Infinity;
  let second: Uint32Array | null = null;
  let secondFreq = Infinity;

  for (let p = 0; p < q.length; p++) {
    const c = q.charCodeAt(p);
    const bm = charBitmap.get(c);
    if (bm === undefined) return out;
    const freq = charFreq.get(c)!;
    if (freq < rarestFreq) {
      second = rarest;
      secondFreq = rarestFreq;
      rarest = bm;
      rarestFreq = freq;
    } else if (freq < secondFreq && bm !== rarest) {
      second = bm;
      secondFreq = freq;
    }
  }

  const needsVerify = q.length > 1;
  for (let w = 0; w < words; w++) {
    let bits = (second !== null ? rarest![w] & second[w] : rarest![w]) | 0;
    const base = w << 5;
    while (bits !== 0) {
      const lowest = bits & -bits;
      const i = base + (31 - Math.clz32(lowest));
      bits ^= lowest;
      if (!needsVerify || haystack[i].indexOf(q) !== -1) {
        out.push(electives[i]);
        if (out.length === k) return out;
      }
    }
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/*  Presentation helpers                                                      */
/* -------------------------------------------------------------------------- */

export interface DifficultyLevel {
  readonly level: string;
  readonly color: string;
}

// Frozen singletons rather than a fresh object per call: this is read once per
// card per render, and a stable identity keeps memoized components from
// re-rendering merely because they were handed a new object.
const VERY_HARD: DifficultyLevel = Object.freeze({ level: "Very Hard", color: "text-red-400" });
const HARD: DifficultyLevel = Object.freeze({ level: "Hard", color: "text-orange-400" });
const MEDIUM: DifficultyLevel = Object.freeze({ level: "Medium", color: "text-yellow-400" });
const EASY: DifficultyLevel = Object.freeze({ level: "Easy", color: "text-green-400" });
const VERY_EASY: DifficultyLevel = Object.freeze({ level: "Very Easy", color: "text-emerald-400" });

export function getDifficultyLevel(cutoff: number): DifficultyLevel {
  if (cutoff >= 8) return VERY_HARD;
  if (cutoff >= 7) return HARD;
  if (cutoff >= 6) return MEDIUM;
  if (cutoff >= 5) return EASY;
  return VERY_EASY;
}

const VALID_COURSE_CODES = [
  "AAE 4311", "AAE 4313", "AAE 4401", "AAE 4403", "AAE 4405", "AAE 4406",
  "AAE 4413", "AAE 4414", "AAE 4417", "AAE 4418", "AAE 4421", "AAE 4422",
  "BIO 4402", "BIO 4403", "BIO 4405", "BIO 4407", "BME 4315", "BME 4402",
  "BME 4404", "BME 4405", "BME 4406", "CHE 4311", "CHE 4312", "CHE 4401",
  "CHE 4402", "CHE 4406", "CHE 4407", "CHE 4409", "CHE 4410", "CHM 4312",
  "CIE 4313", "CIE 4314", "CIE 4316", "CIE 4401", "CIE 4402", "CIE 4409",
  "CIE 4410", "CIE 4417", "CIE 4418", "DSE 4401", "DSE 4402", "DSE 4405",
  "DSE 4406", "ECE 4311", "ECE 4406", "ECE 4409", "ECE 4411", "ECE 4416",
  "ECE 4421", "ECE 4424", "ELE 4312", "ELE 4409", "ELE 4415", "ELE 4416",
  "HUM 4322", "HUM 4323", "HUM 4329", "HUM 4401", "HUM 4402", "HUM 4408",
  "HUM 4409", "HUM 4411", "HUM 4420", "HUM 4424", "ICE 4316", "ICE 4402",
  "ICT 4401", "ICT 4402", "ICT 4414", "MAT 4405", "MAT 4407", "MIE 4401",
  "MIE 4402", "MIE 4408", "MIE 4409", "MIE 4421",
];

// A code's URL never changes, so build it once instead of running
// `encodeURIComponent` and a template interpolation on every render of every card.
const COURSE_PAGE_URLS = new Map<string, string>(
  VALID_COURSE_CODES.map((code) => [
    code,
    `https://courses.coolstuff.work/course/${encodeURIComponent(code)}`,
  ]),
);

export function getCoursePageUrl(code: string): string | null {
  return COURSE_PAGE_URLS.get(code) ?? null;
}
