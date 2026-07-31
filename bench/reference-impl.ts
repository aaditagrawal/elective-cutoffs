/**
 * Frozen, verbatim copy of the original `lib/electives.ts` query functions as they
 * existed at commit 1b011f0, before the query-engine optimization.
 *
 * This is the ORACLE for the differential test in `bench/verify.ts`: the optimized
 * engine must produce byte-identical results to these functions for every scenario.
 * Do not "improve" anything in this file — its only job is to preserve the old
 * behavior so we can prove the new behavior matches it.
 */
import type { Elective, ElectiveType } from "@/lib/electives";

export function refGetElectiveTypes(electives: Elective[]): ElectiveType[] {
  return Array.from(new Set(electives.map((elective) => elective.type)));
}

export function refGetDepartments(electives: Elective[]): string[] {
  return Array.from(new Set(electives.map((elective) => elective.department))).sort();
}

export function refFilterElectives(
  electives: Elective[],
  type?: string,
  department?: string,
  search?: string,
  sortBy?: "name" | "cutoff" | "students" | "difficulty",
  sortOrder?: "asc" | "desc",
): Elective[] {
  let filtered = [...electives];

  if (type && type !== "all") {
    filtered = filtered.filter((elective) => elective.type === type);
  }

  if (department && department !== "all") {
    filtered = filtered.filter((elective) => elective.department === department);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (elective) =>
        elective.name.toLowerCase().includes(searchLower) ||
        elective.code.toLowerCase().includes(searchLower) ||
        elective.department.toLowerCase().includes(searchLower),
    );
  }

  const order = sortOrder === "desc" ? -1 : 1;
  switch (sortBy) {
    case "cutoff":
    case "difficulty":
      filtered.sort((a, b) => (a.lowestCGPA - b.lowestCGPA) * order);
      break;
    case "students":
      filtered.sort((a, b) => (a.students - b.students) * order);
      break;
    case "name":
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name) * order);
  }

  return filtered;
}

export function refGetStats(electives: Elective[]) {
  const typeCounts = refGetElectiveTypes(electives).map((type) => ({
    type,
    count: electives.filter((elective) => elective.type === type).length,
  }));

  return {
    totalElectives: electives.length,
    typeCounts,
    oeCount: typeCounts
      .filter(({ type }) => type.startsWith("OE"))
      .reduce((sum, { count }) => sum + count, 0),
    programElectiveCount: typeCounts
      .filter(({ type }) => type.startsWith("PE"))
      .reduce((sum, { count }) => sum + count, 0),
    lowestCutoff: Math.min(...electives.map((elective) => elective.lowestCGPA)),
    highestCutoff: Math.max(...electives.map((elective) => elective.lowestCGPA)),
    totalStudents: electives.reduce((sum, elective) => sum + elective.students, 0),
    departments: refGetDepartments(electives).length,
  };
}

/** Original: a freshly allocated object on every call, once per card per render. */
export function refGetDifficultyLevel(cutoff: number): { level: string; color: string } {
  if (cutoff >= 8) return { level: "Very Hard", color: "text-red-400" };
  if (cutoff >= 7) return { level: "Hard", color: "text-orange-400" };
  if (cutoff >= 6) return { level: "Medium", color: "text-yellow-400" };
  if (cutoff >= 5) return { level: "Easy", color: "text-green-400" };
  return { level: "Very Easy", color: "text-emerald-400" };
}

const REF_VALID_COURSE_CODES = new Set([
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
]);

/** Original: `encodeURIComponent` plus a template interpolation on every call. */
export function refGetCoursePageUrl(code: string): string | null {
  if (!REF_VALID_COURSE_CODES.has(code)) return null;
  return `https://courses.coolstuff.work/course/${encodeURIComponent(code)}`;
}

/**
 * The original command-palette result computation. Verbatim except that the
 * hard-coded `8` is a parameter, so the same oracle can check `searchTopK` at
 * other cut-offs; `k = 8` reproduces the original exactly.
 */
export function refCommandSearch(electives: Elective[], query: string, k = 8): Elective[] {
  return query.length > 0
    ? electives
        .filter(
          (e) =>
            e.name.toLowerCase().includes(query.toLowerCase()) ||
            e.code.toLowerCase().includes(query.toLowerCase()) ||
            e.department.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, k)
    : electives.slice(0, k);
}
