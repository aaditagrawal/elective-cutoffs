"use client";

import { classNames } from "@/ui.stylex";
import { ProgressiveBlur } from "@/components/progressive-blur";
import type { DashboardChrome } from "@/components/dashboard-chrome";
import { useHighlightScroll } from "@/components/highlight-scroll";

import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useDeferredValue,
  useReducer,
  memo,
  useLayoutEffect,
  type ElementType,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { SemesterId } from "@/lib/electives";
import {
  browseReducer,
  calendarSemester,
  electiveElementId,
  highlightScrollKey,
  initialBrowseState,
  resultsFreshness,
  semesterForInstant,
  showsServerList,
  type BrowseSortField,
  type SemesterOwner,
} from "@/lib/ui-state";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Building2,
  BookOpen,
  Command,
  Loader2,
} from "lucide-react";

type BrowseModule = typeof import("./browse-view");

function StatCardImpl({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ElementType;
}) {
  return (
    <Card className={classNames.electiveDashboard54}>
      <CardHeader className={classNames.electiveDashboard55}>
        <CardTitle className={classNames.electiveDashboard56}>{title}</CardTitle>
        <Icon className={classNames.electiveDashboard32} />
      </CardHeader>
      <CardContent>
        <div className={classNames.electiveDashboard57}>{value}</div>
        {subtitle ? <p className={classNames.electiveDashboard58}>{subtitle}</p> : null}
      </CardContent>
    </Card>
  );
}

const StatCard = memo(StatCardImpl);

function loadBrowse(): Promise<BrowseModule> {
  return import("./browse-view");
}

export default function ElectiveDashboard({ initialChrome }: { initialChrome: DashboardChrome }) {
  const [state, dispatch] = useReducer(browseReducer, initialBrowseState);
  const { semester, search, typeFilter, deptFilter, sortField, sortOrder, highlight, commandOpen } =
    state;
  const semesterOwnerRef = useRef<SemesterOwner>("fallback");
  const [browse, setBrowse] = useState<BrowseModule | null>(null);

  useEffect(() => {
    const next = calendarSemester(
      semesterOwnerRef.current,
      initialBrowseState.semester,
      semesterForInstant(new Date()),
    );
    if (next !== null) dispatch({ type: "apply-calendar", semester: next });
  }, []);

  // The list HTML is already on the page. Pull the query engine in after first
  // paint so a filter, a semester change, or the command palette does not wait
  // on a cold download.
  useEffect(() => {
    let cancel = false;
    const start = () => {
      void loadBrowse().then((mod) => {
        if (!cancel) setBrowse(() => mod);
      });
    };
    const idle = window.requestIdleCallback;
    if (idle) {
      const id = idle(start);
      return () => {
        cancel = true;
        window.cancelIdleCallback(id);
      };
    }
    const id = window.setTimeout(start, 300);
    return () => {
      cancel = true;
      window.clearTimeout(id);
    };
  }, []);

  const deferredSearch = useDeferredValue(search);
  const freshness = resultsFreshness(search, deferredSearch);
  const serverList = showsServerList(state);
  const waiting = !serverList && browse === null;

  useEffect(() => {
    if (browse !== null || (serverList && !commandOpen)) return;
    void loadBrowse().then((mod) => setBrowse(() => mod));
  }, [browse, commandOpen, serverList]);
  const chrome = !serverList && browse ? browse.chromeFor(semester) : initialChrome;

  const clearHighlight = useCallback(() => dispatch({ type: "clear-highlight" }), []);
  const highlightKey = highlight === null ? null : highlightScrollKey(highlight);
  const highlightElementId =
    highlight === null ? null : electiveElementId(highlight.code, highlight.electiveType);
  useHighlightScroll(
    highlightKey,
    highlightElementId,
    serverList && highlight !== null,
    serverList ? 1 : 0,
    clearHighlight,
  );

  useEffect(() => {
    if (!serverList || highlightElementId === null) return;
    const element = document.getElementById(highlightElementId);
    if (!element) return;
    const tokens = classNames.electiveDashboard59.split(" ").filter((token) => token !== "");
    element.classList.add(...tokens);
    return () => element.classList.remove(...tokens);
  }, [serverList, highlightElementId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        dispatch({ type: "toggle-command" });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCloseCommand = useCallback(() => dispatch({ type: "close-command" }), []);
  const handleSemesterChange = useCallback((nextSemester: SemesterId) => {
    semesterOwnerRef.current = "user";
    dispatch({ type: "choose-semester", semester: nextSemester });
  }, []);
  const clearFilters = useCallback(() => dispatch({ type: "clear-filters" }), []);
  const ensureBrowse = () => {
    if (browse === null) void loadBrowse().then((mod) => setBrowse(() => mod));
  };

  const toggleSort = (field: BrowseSortField) => {
    dispatch({ type: "toggle-sort", field });
  };

  const filtersActive = search !== "" || typeFilter !== "all" || deptFilter !== "all";
  const LiveResults = browse?.LiveResults;
  const CommandOverlay = browse?.CommandOverlay;
  const showLive = !serverList && LiveResults !== undefined;

  useLayoutEffect(() => {
    document.documentElement.dataset.results = showLive ? "live" : "server";
  }, [showLive]);

  return (
    <>
      {commandOpen && CommandOverlay ? (
        <CommandOverlay
          semester={semester}
          onClose={handleCloseCommand}
          onSelect={(elective) => {
            dispatch({
              type: "select-elective",
              code: elective.code,
              electiveType: elective.type,
            });
          }}
        />
      ) : null}

      <div className={classNames.electiveDashboard84}>
        <div className={classNames.electiveDashboard85} />
        <div className={classNames.electiveDashboard86}>
          <div className={classNames.electiveDashboard87}>
            <h1 className={classNames.electiveDashboard88}>Elective Cutoff Analysis</h1>
            <p className={classNames.electiveDashboard89}>
              {semester === "sixth"
                ? "Explore VI semester CGPA cutoffs for Open Electives and Program Electives I–II."
                : "Explore VII semester CGPA cutoffs for Open Elective III and Program Electives III–VII."}
            </p>
            <p className={classNames.electiveDashboard90}>Academic Year {chrome.academicYear}</p>

            <div className={classNames.electiveDashboard91}>
              {(
                [
                  ["sixth", "6th Semester"],
                  ["seventh", "7th Semester"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  onPointerEnter={ensureBrowse}
                  onClick={() => handleSemesterChange(value)}
                  aria-pressed={semester === value}
                  className={`${classNames.electiveDashboard94} ${
                    semester === value
                      ? classNames.electiveDashboard92
                      : classNames.electiveDashboard93
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onPointerEnter={ensureBrowse}
              onClick={() => dispatch({ type: "open-command" })}
              className={classNames.electiveDashboard95}
            >
              <Search className={classNames.electiveDashboard96} />
              <span>Search...</span>
              <kbd className={classNames.electiveDashboard97}>
                <Command className={classNames.electiveDashboard98} />K
              </kbd>
            </button>
          </div>

          <div className={classNames.electiveDashboard99}>
            <StatCard
              title="Total Electives"
              value={waiting ? "…" : chrome.totalElectives}
              subtitle={
                semester === "sixth"
                  ? `${chrome.oeCount} OE • ${chrome.programElectiveCount} PE I–II`
                  : `${chrome.oeCount} OE III • ${chrome.programElectiveCount} PE III–VII`
              }
              icon={BookOpen}
            />
            <StatCard
              title="Departments"
              value={waiting ? "…" : chrome.departmentCount}
              subtitle="Offering electives"
              icon={Building2}
            />
            <StatCard
              title="Lowest Cutoff"
              value={waiting ? "…" : chrome.lowestCutoff.toFixed(2)}
              subtitle="Easiest to get"
              icon={TrendingDown}
            />
            <StatCard
              title="Highest Cutoff"
              value={waiting ? "…" : chrome.highestCutoff.toFixed(2)}
              subtitle="Most competitive"
              icon={TrendingUp}
            />
          </div>
        </div>
      </div>

      <div className={classNames.electiveDashboard100} onPointerEnter={ensureBrowse}>
        <ProgressiveBlur feather="long" />
        <div className={classNames.electiveDashboard101}>
          <div className={classNames.electiveDashboard102}>
            <div className={classNames.electiveDashboard103}>
              <Input
                placeholder="Search electives..."
                value={search}
                onChange={(event) => dispatch({ type: "set-search", query: event.target.value })}
                className={classNames.electiveDashboard104}
              />
            </div>
            <div className={classNames.electiveDashboard105}>
              <Select
                value={typeFilter}
                onValueChange={(value) => dispatch({ type: "set-type", value })}
              >
                <SelectTrigger className={classNames.electiveDashboard106}>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {chrome.types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={deptFilter}
                onValueChange={(value) => dispatch({ type: "set-department", value })}
              >
                <SelectTrigger className={classNames.electiveDashboard106}>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Depts</SelectItem>
                  {chrome.departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={classNames.electiveDashboard107}>
              <button
                onClick={() => toggleSort("cutoff")}
                className={`${classNames.electiveDashboard110} ${
                  sortField === "cutoff"
                    ? classNames.electiveDashboard108
                    : classNames.electiveDashboard109
                }`}
              >
                Cutoff {sortField === "cutoff" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => toggleSort("students")}
                className={`${classNames.electiveDashboard110} ${
                  sortField === "students"
                    ? classNames.electiveDashboard108
                    : classNames.electiveDashboard109
                }`}
              >
                Students {sortField === "students" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => toggleSort("name")}
                className={`${classNames.electiveDashboard110} ${
                  sortField === "name"
                    ? classNames.electiveDashboard108
                    : classNames.electiveDashboard109
                }`}
              >
                Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              {waiting ? (
                <Loader2
                  className={`${classNames.electiveDashboard32} cutoff-spin`}
                  aria-hidden="true"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {showLive && LiveResults ? (
        <LiveResults
          semester={semester}
          search={deferredSearch}
          typeFilter={typeFilter}
          deptFilter={deptFilter}
          sortField={sortField}
          sortOrder={sortOrder}
          highlight={highlight}
          pending={freshness === "pending"}
          filtersActive={filtersActive}
          onClearFilters={clearFilters}
          onClearHighlight={clearHighlight}
        />
      ) : null}
    </>
  );
}
