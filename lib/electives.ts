import sixthSemesterData from "@/data/sixth-semester.json";
import seventhSemesterData from "@/data/seventh-semester.json";

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

export const semesterDatasets: Record<SemesterId, SemesterDataset> = {
  sixth: sixthSemesterData as SemesterDataset,
  seventh: seventhSemesterData as SemesterDataset,
};

export function getElectiveTypes(electives: Elective[]): ElectiveType[] {
  return Array.from(new Set(electives.map((elective) => elective.type)));
}

export function getDepartments(electives: Elective[]): string[] {
  return Array.from(new Set(electives.map((elective) => elective.department))).sort();
}

export function filterElectives(
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

export function getStats(electives: Elective[]) {
  const typeCounts = getElectiveTypes(electives).map((type) => ({
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
    departments: getDepartments(electives).length,
  };
}

export function getDifficultyLevel(cutoff: number): { level: string; color: string } {
  if (cutoff >= 8) return { level: "Very Hard", color: "text-red-400" };
  if (cutoff >= 7) return { level: "Hard", color: "text-orange-400" };
  if (cutoff >= 6) return { level: "Medium", color: "text-yellow-400" };
  if (cutoff >= 5) return { level: "Easy", color: "text-green-400" };
  return { level: "Very Easy", color: "text-emerald-400" };
}

const VALID_COURSE_CODES = new Set([
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

export function getCoursePageUrl(code: string): string | null {
  if (!VALID_COURSE_CODES.has(code)) return null;
  return `https://courses.coolstuff.work/course/${encodeURIComponent(code)}`;
}
