/** Numbers and labels the hero can paint before the query code has loaded. */
export type DashboardChrome = {
  academicYear: string;
  semesterLabel: string;
  totalElectives: number;
  departmentCount: number;
  lowestCutoff: number;
  highestCutoff: number;
  oeCount: number;
  programElectiveCount: number;
  types: readonly string[];
  departments: readonly string[];
};
