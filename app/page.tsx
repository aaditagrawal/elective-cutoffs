import { classNames } from "@/ui.stylex";
import type { DashboardChrome } from "@/components/dashboard-chrome";
import ElectiveDashboard from "@/components/elective-dashboard";
import { ElectiveResults } from "@/components/elective-results";
import {
  filterElectives,
  getDepartments,
  getElectiveTypes,
  getStats,
  semesterDatasets,
} from "@/lib/electives";
import { initialBrowseState } from "@/lib/ui-state";

export default function Page() {
  const semester = initialBrowseState.semester;
  const dataset = semesterDatasets[semester];
  const electives = dataset.electives;
  const stats = getStats(electives);
  const visible = filterElectives(
    electives,
    initialBrowseState.typeFilter,
    initialBrowseState.deptFilter,
    initialBrowseState.search,
    initialBrowseState.sortField,
    initialBrowseState.sortOrder,
  );
  const chrome: DashboardChrome = {
    academicYear: dataset.metadata.academicYear,
    semesterLabel: dataset.metadata.semester,
    totalElectives: stats.totalElectives,
    departmentCount: stats.departments,
    lowestCutoff: stats.lowestCutoff,
    highestCutoff: stats.highestCutoff,
    oeCount: stats.oeCount,
    programElectiveCount: stats.programElectiveCount,
    types: getElectiveTypes(electives),
    departments: getDepartments(electives),
  };

  return (
    <div className={classNames.electiveDashboard83}>
      <ElectiveDashboard initialChrome={chrome} />
      <div id="cutoff-server-results">
        <ElectiveResults
          electives={visible}
          academicYear={dataset.metadata.academicYear}
          semesterLabel={dataset.metadata.semester}
          highlightCode={null}
          highlightType={null}
          pending={false}
        />
      </div>
    </div>
  );
}
