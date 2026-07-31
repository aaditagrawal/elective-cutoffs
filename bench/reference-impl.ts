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

/** Verbatim copy of the original command-palette result computation. */
export function refCommandSearch(electives: Elective[], query: string): Elective[] {
  return query.length > 0
    ? electives
        .filter(
          (e) =>
            e.name.toLowerCase().includes(query.toLowerCase()) ||
            e.code.toLowerCase().includes(query.toLowerCase()) ||
            e.department.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 8)
    : electives.slice(0, 8);
}
