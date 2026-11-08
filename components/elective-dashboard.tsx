"use client";

import { classNames, difficultyClassNames } from "@/ui.stylex";

import { useEffect, useRef, useCallback, useMemo, useDeferredValue, useReducer, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  semesterDatasets,
  filterElectives,
  getElectiveTypes,
  getDepartments,
  getStats,
  getDifficultyLevel,
  getCoursePageUrl,
  searchTopK,
  type Elective,
  type SemesterId,
} from "@/lib/electives";
import {
  HIGHLIGHT_VISIBLE_MS,
  browseReducer,
  calendarSemester,
  electiveElementId,
  filtersAreActive,
  highlightScrollKey,
  initialBrowseState,
  initialPaletteState,
  nextHighlightScroll,
  paletteReducer,
  resultsFreshness,
  semesterForInstant,
  type BrowseSortField,
  type HighlightScroll,
  type SemesterOwner,
} from "@/lib/ui-state";
import {
  Search,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Building2,
  ExternalLink,
  Info,
  BookOpen,
  X,
  Command,
  Loader2,
} from "lucide-react";

/** How many results the command palette shows. */
const PALETTE_RESULTS = 8;

// Command Search Modal.
//
// Mounted only while the palette is open, so "closed" is the absence of this
// component rather than a boolean beside a leftover query and selection. Those
// two used to be reset in effects after open, which painted one frame of the
// previous results and then rendered again.
function CommandSearchImpl({
  onClose,
  onSelect,
  electives,
}: {
  onClose: () => void;
  onSelect: (elective: Elective) => void;
  electives: Elective[];
}) {
  const [palette, dispatchPalette] = useReducer(paletteReducer, initialPaletteState);
  const { query, selectedIndex } = palette;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    inputRef.current?.focus();
    const containFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !modalRef.current?.contains(event.target))
        inputRef.current?.focus();
    };
    const containTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = modalRef.current?.querySelectorAll<HTMLElement>("button, a[href], input");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("focusin", containFocus);
    document.addEventListener("keydown", containTab);
    return () => {
      document.removeEventListener("focusin", containFocus);
      document.removeEventListener("keydown", containTab);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  // Recomputed only when the query or dataset changes. Without the memo this
  // re-ran on every render of this component — including every arrow-key press,
  // which only moves the selection highlight and cannot change the results.
  const results = useMemo(() => searchTopK(electives, query, PALETTE_RESULTS), [electives, query]);

  // Global escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selectedEl?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          dispatchPalette({ type: "move", direction: "next", count: results.length });
          break;
        case "ArrowUp":
          e.preventDefault();
          dispatchPalette({ type: "move", direction: "previous", count: results.length });
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            onSelect(results[selectedIndex]);
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [results, selectedIndex, onSelect, onClose],
  );

  return (
    <div ref={modalRef} className={classNames.electiveDashboard24} role="presentation">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close search"
        className={classNames.electiveDashboard25}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={classNames.electiveDashboard26}
        role="dialog"
        aria-modal="true"
        aria-label="Search electives"
      >
        <div className={classNames.electiveDashboard27}>
          {/* Search Input */}
          <div className={classNames.electiveDashboard28}>
            <Search className={classNames.electiveDashboard29} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => dispatchPalette({ type: "query", query: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="Search electives..."
              className={classNames.electiveDashboard30}
            />
            <button onClick={onClose} className={classNames.electiveDashboard31}>
              <X className={classNames.electiveDashboard32} />
            </button>
          </div>

          {/* Results */}
          <div ref={listRef} className={classNames.electiveDashboard33}>
            {results.length === 0 ? (
              <div className={classNames.electiveDashboard34}>
                No electives found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              results.map((elective, idx) => {
                const difficulty = getDifficultyLevel(elective.lowestCGPA);
                const courseUrl = getCoursePageUrl(elective.code);
                return (
                  <div key={`${elective.code}-${elective.type}`}>
                    <button
                      data-index={idx}
                      onClick={() => {
                        onSelect(elective);
                        onClose();
                      }}
                      className={`${classNames.electiveDashboard37} ${
                        idx === selectedIndex
                          ? classNames.electiveDashboard35
                          : classNames.electiveDashboard36
                      }`}
                    >
                      <div className={classNames.electiveDashboard38}>
                        <GraduationCap className={classNames.electiveDashboard39} />
                      </div>
                      <div className={classNames.electiveDashboard40}>
                        <div className={classNames.electiveDashboard41}>
                          <span className={classNames.electiveDashboard42}>{elective.code}</span>
                          {courseUrl ? (
                            <ExternalLink className={classNames.electiveDashboard43} />
                          ) : (
                            <Info className={classNames.electiveDashboard44} />
                          )}
                          <span className={classNames.electiveDashboard45}>{elective.type}</span>
                        </div>
                        <div className={classNames.electiveDashboard47}>{elective.name}</div>
                        <div className={classNames.electiveDashboard48}>
                          {elective.department} • Min CGPA:{" "}
                          <span
                            className={`${classNames.electiveDashboard49} ${difficultyClassNames[difficulty.color]}`}
                          >
                            {elective.lowestCGPA.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`${classNames.electiveDashboard50} ${difficultyClassNames[difficulty.color]}`}
                      >
                        {difficulty.level}
                      </div>
                    </button>
                    {courseUrl && (
                      <a
                        href={courseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classNames.electiveDashboard46}
                        aria-label={`Course details for ${elective.name}`}
                      >
                        Course details
                      </a>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className={classNames.electiveDashboard51}>
            <span className={classNames.electiveDashboard52}>
              <kbd className={classNames.electiveDashboard53}>↑</kbd>
              <kbd className={classNames.electiveDashboard53}>↓</kbd>
              Navigate
            </span>
            <span className={classNames.electiveDashboard52}>
              <kbd className={classNames.electiveDashboard53}>↵</kbd>
              Select
            </span>
            <span className={classNames.electiveDashboard52}>
              <kbd className={classNames.electiveDashboard53}>esc</kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoized: while the palette is open the dashboard still re-renders (the
// highlight dwell, for example). The props here change only when the semester
// dataset or the callbacks change.
const CommandSearch = memo(CommandSearchImpl);

// Stats Card Component
function StatCardImpl({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
}) {
  return (
    <Card className={classNames.electiveDashboard54}>
      <CardHeader className={classNames.electiveDashboard55}>
        <CardTitle className={classNames.electiveDashboard56}>{title}</CardTitle>
        <Icon className={classNames.electiveDashboard32} />
      </CardHeader>
      <CardContent>
        <div className={classNames.electiveDashboard57}>{value}</div>
        {subtitle && <p className={classNames.electiveDashboard58}>{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

// Memoized: stat values depend only on the dataset, so these should not re-render
// when the search box or a filter changes.
const StatCard = memo(StatCardImpl);

// Elective Card Component
function ElectiveCardImpl({
  elective,
  isHighlighted,
}: {
  elective: Elective;
  isHighlighted?: boolean;
}) {
  const difficulty = getDifficultyLevel(elective.lowestCGPA);
  const courseUrl = getCoursePageUrl(elective.code);

  return (
    <Card
      id={electiveElementId(elective.code, elective.type)}
      className={`${classNames.electiveDashboard60} ${
        isHighlighted ? classNames.electiveDashboard59 : ""
      }`}
    >
      <CardHeader className={classNames.electiveDashboard61}>
        <div className={classNames.electiveDashboard62}>
          <Badge variant="secondary" className={classNames.electiveDashboard63}>
            {elective.type}
          </Badge>
          {courseUrl ? (
            <a
              href={courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={classNames.electiveDashboard64}
            >
              <Badge variant="outline" className={classNames.electiveDashboard65}>
                {elective.code}
                <ExternalLink className={classNames.electiveDashboard66} />
              </Badge>
            </a>
          ) : (
            <Badge variant="outline" className={classNames.electiveDashboard67}>
              {elective.code}
              <Info className={classNames.electiveDashboard66} />
            </Badge>
          )}
        </div>
        {courseUrl ? (
          <a
            href={courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.electiveDashboard68}
          >
            <CardTitle className={classNames.electiveDashboard69}>{elective.name}</CardTitle>
          </a>
        ) : (
          <CardTitle className={classNames.electiveDashboard70}>{elective.name}</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        <div className={classNames.electiveDashboard71}>
          <div className={classNames.electiveDashboard72}>
            <div className={classNames.electiveDashboard73}>Min CGPA</div>
            <div
              className={`${classNames.electiveDashboard74} ${difficultyClassNames[difficulty.color]}`}
            >
              {elective.lowestCGPA.toFixed(2)}
            </div>
          </div>
          <div className={classNames.electiveDashboard72}>
            <div className={classNames.electiveDashboard73}>Max CGPA</div>
            <div className={classNames.electiveDashboard75}>{elective.highestCGPA.toFixed(2)}</div>
          </div>
          <div className={classNames.electiveDashboard72}>
            <div className={classNames.electiveDashboard73}>Students</div>
            <div className={classNames.electiveDashboard75}>{elective.students}</div>
          </div>
        </div>
        <div className={classNames.electiveDashboard76}>
          <div className={classNames.electiveDashboard77}>
            <span className={classNames.electiveDashboard78}>Allocation Difficulty</span>
            <span
              className={`${classNames.electiveDashboard79} ${difficultyClassNames[difficulty.color]}`}
            >
              {difficulty.level}
            </span>
          </div>
          {/* CGPA Range Bar */}
          <div className={classNames.electiveDashboard80}>
            <div
              className={classNames.electiveDashboard81}
              style={{
                marginLeft: `${(elective.lowestCGPA / 10) * 100}%`,
                width: `${((elective.highestCGPA - elective.lowestCGPA) / 10) * 100}%`,
              }}
            />
          </div>
          <div className={classNames.electiveDashboard82}>
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Memoized, and the reason the whole grid stops re-rendering on every keystroke.
 *
 * `elective` is a stable object straight out of the dataset and `isHighlighted`
 * is a boolean, so the default shallow comparison is exactly right: a card only
 * re-renders when it is the one being highlighted. This relies on
 * `getDifficultyLevel` returning frozen singletons rather than a fresh object
 * per call, which the query-engine change established.
 */
const ElectiveCard = memo(ElectiveCardImpl);

export default function ElectiveDashboard() {
  const [state, dispatch] = useReducer(browseReducer, initialBrowseState);
  const { semester, search, typeFilter, deptFilter, sortField, sortOrder, highlight, commandOpen } =
    state;
  // "fallback" until the user picks a semester. A ref, not state: recording the
  // hand-off in React state would re-render the grid when nothing visible changed.
  const semesterOwnerRef = useRef<SemesterOwner>("fallback");
  const highlightScrollRef = useRef<HighlightScroll>({ phase: "idle" });
  // Absolute time the ring should come down. List updates reschedule the timer
  // against this deadline instead of granting another full dwell.
  const dismissAtRef = useRef<number | null>(null);

  useEffect(() => {
    // Resolve on page load, not during Next.js's static build. The reducer
    // bails out when the calendar semester is already the SSR fallback, so
    // November (VI) does not render the grid twice. A click that landed first
    // flips the owner ref and this dispatch is skipped.
    const next = calendarSemester(
      semesterOwnerRef.current,
      initialBrowseState.semester,
      semesterForInstant(new Date()),
    );
    if (next !== null) dispatch({ type: "apply-calendar", semester: next });
  }, []);

  const dataset = semesterDatasets[semester];
  const electiveData = dataset.electives;
  const electiveTypes = useMemo(() => getElectiveTypes(electiveData), [electiveData]);
  const stats = useMemo(() => getStats(electiveData), [electiveData]);
  const departments = useMemo(() => getDepartments(electiveData), [electiveData]);

  // The input stays on `search` so typing is never held up; the grid renders
  // from the deferred value, letting React keep the keystroke responsive and
  // drop intermediate list renders when typing outpaces rendering.
  const deferredSearch = useDeferredValue(search);
  const freshness = resultsFreshness(search, deferredSearch);

  const filteredElectives = useMemo(() => {
    return filterElectives(
      electiveData,
      typeFilter,
      deptFilter,
      deferredSearch,
      sortField,
      sortOrder,
    );
  }, [electiveData, typeFilter, deptFilter, deferredSearch, sortField, sortOrder]);

  // Keyboard shortcut for Ctrl+K (toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        dispatch({ type: "toggle-command" });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectElective = useCallback((elective: Elective) => {
    dispatch({
      type: "select-elective",
      code: elective.code,
      electiveType: elective.type,
    });
  }, []);

  const clearHighlight = useCallback(() => {
    dispatch({ type: "clear-highlight" });
  }, []);

  const highlightKey = highlight === null ? null : highlightScrollKey(highlight);
  const highlightElementId =
    highlight === null ? null : electiveElementId(highlight.code, highlight.electiveType);

  /**
   * Scroll to the highlighted card once the grid has actually rendered it,
   * then hold the ring until `dismissAtRef`.
   *
   * Phases live in `highlightScrollRef` (`idle` → `waiting` → `shown`):
   * - `waiting` means the id is armed but the deferred list has not painted
   *   the card yet. No dismiss timer runs, so a slow list cannot expire the
   *   highlight before the card exists.
   * - `shown` scrolls once. `filteredElectives` is a dependency because that
   *   is what puts the card in the DOM, but the deadline stays put — the old
   *   effect restarted a fresh 2s timeout on every list commit.
   */
  useEffect(() => {
    // The card is rendered from `filteredElectives`, which lags the input via
    // `useDeferredValue`. Treat it as missing until that list actually contains
    // it — a leftover DOM node from the previous result set must not count.
    let element: HTMLElement | null = null;
    if (highlightElementId !== null) {
      for (let i = 0; i < filteredElectives.length; i++) {
        const elective = filteredElectives[i];
        if (electiveElementId(elective.code, elective.type) === highlightElementId) {
          element = document.getElementById(highlightElementId);
          break;
        }
      }
    }
    const previous = highlightScrollRef.current;
    const next = nextHighlightScroll(previous, highlightKey, element !== null);
    highlightScrollRef.current = next;

    if (next.phase !== "shown") {
      dismissAtRef.current = null;
      return;
    }

    const firstSight = previous !== next;
    if (firstSight) {
      if (element === null) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      dismissAtRef.current = Date.now() + HIGHLIGHT_VISIBLE_MS;
    }

    const due = dismissAtRef.current;
    if (due === null) return;
    const timer = window.setTimeout(
      () => {
        dismissAtRef.current = null;
        clearHighlight();
      },
      Math.max(0, due - Date.now()),
    );
    return () => window.clearTimeout(timer);
  }, [highlightKey, highlightElementId, filteredElectives, clearHighlight]);

  // Stable identity so the memoized palette isn't invalidated on every render.
  const handleCloseCommand = useCallback(() => dispatch({ type: "close-command" }), []);

  const handleSemesterChange = useCallback((nextSemester: SemesterId) => {
    semesterOwnerRef.current = "user";
    dispatch({ type: "choose-semester", semester: nextSemester });
  }, []);

  // The sort buttons are plain DOM nodes, so a stable callback would not
  // skip any child render. The reducer owns the field/order pairing.
  const toggleSort = (field: BrowseSortField) => {
    dispatch({ type: "toggle-sort", field });
  };

  return (
    <div className={classNames.electiveDashboard83}>
      {/* Command Search Modal. Unmounted while closed, so it cannot keep a stale query. */}
      {commandOpen ? (
        <CommandSearch
          onClose={handleCloseCommand}
          onSelect={handleSelectElective}
          electives={electiveData}
        />
      ) : null}

      {/* Hero Section */}
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
            <p className={classNames.electiveDashboard90}>
              Academic Year {dataset.metadata.academicYear}
            </p>

            {/* Semester Toggle */}
            <div className={classNames.electiveDashboard91}>
              {(
                [
                  ["sixth", "6th Semester"],
                  ["seventh", "7th Semester"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
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

            {/* Quick Search Button */}
            <button
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

          {/* Stats Grid */}
          <div className={classNames.electiveDashboard99}>
            <StatCard
              title="Total Electives"
              value={stats.totalElectives}
              subtitle={
                semester === "sixth"
                  ? `${stats.oeCount} OE • ${stats.programElectiveCount} PE I–II`
                  : `${stats.oeCount} OE III • ${stats.programElectiveCount} PE III–VII`
              }
              icon={BookOpen}
            />
            <StatCard
              title="Departments"
              value={stats.departments}
              subtitle="Offering electives"
              icon={Building2}
            />
            <StatCard
              title="Lowest Cutoff"
              value={stats.lowestCutoff.toFixed(2)}
              subtitle="Easiest to get"
              icon={TrendingDown}
            />
            <StatCard
              title="Highest Cutoff"
              value={stats.highestCutoff.toFixed(2)}
              subtitle="Most competitive"
              icon={TrendingUp}
            />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={classNames.electiveDashboard100}>
        <div className={classNames.electiveDashboard101}>
          <div className={classNames.electiveDashboard102}>
            {/* Search */}
            <div className={classNames.electiveDashboard103}>
              <Input
                placeholder="Search electives..."
                value={search}
                onChange={(e) => dispatch({ type: "set-search", query: e.target.value })}
                className={classNames.electiveDashboard104}
              />
            </div>

            {/* Type and Department Filters - side by side on mobile */}
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
                  {electiveTypes.map((type) => (
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
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Buttons */}
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
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={classNames.electiveDashboard111}>
        <div className={classNames.electiveDashboard112}>
          <div className={classNames.electiveDashboard41}>
            <h2 className={classNames.electiveDashboard113}>
              {filteredElectives.length} Elective{filteredElectives.length !== 1 ? "s" : ""} Found
            </h2>
            {freshness === "pending" ? (
              <Loader2
                className={`${classNames.electiveDashboard32} cutoff-spin`}
                aria-hidden="true"
              />
            ) : null}
          </div>
          {filtersAreActive(state) ? (
            <button
              onClick={() => dispatch({ type: "clear-filters" })}
              className={classNames.electiveDashboard114}
            >
              Clear Filters
            </button>
          ) : null}
        </div>

        {/* Electives Grid */}
        <div className={classNames.electiveDashboard115} aria-busy={freshness === "pending"}>
          {/*
           * The key deliberately excludes the array index. With it, every
           * card's key changed whenever filtering or sorting moved it, so
           * React unmounted and remounted the whole grid instead of
           * reordering it — which also defeats the memo above.
           * `bench/verify.ts` asserts (code, type) is unique per dataset.
           */}
          {filteredElectives.map((elective) => (
            <ElectiveCard
              key={`${elective.code}-${elective.type}`}
              elective={elective}
              isHighlighted={
                highlight !== null &&
                highlight.code === elective.code &&
                highlight.electiveType === elective.type
              }
            />
          ))}
        </div>

        {filteredElectives.length === 0 && (
          <div className={classNames.electiveDashboard116}>
            <GraduationCap className={classNames.electiveDashboard117} />
            <h3 className={classNames.electiveDashboard118}>No electives found</h3>
            <p className={classNames.electiveDashboard78}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={classNames.electiveDashboard119}>
        <p>
          Data based on actual {dataset.metadata.semester} semester allocations for Academic Year{" "}
          {dataset.metadata.academicYear}. Cutoffs may vary each semester.
        </p>
        <p className={classNames.electiveDashboard120}>Use this as a reference, not a guarantee.</p>
        <p className={classNames.electiveDashboard121}>
          Made by <span className={classNames.home8}>Aditya Mathpal</span>,{" "}
          <a
            href="https://lverma.com"
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.layout14}
          >
            Lakshit Verma
          </a>
          , and{" "}
          <a
            href="https://aadit.cc"
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.layout14}
          >
            Aadit Agrawal
          </a>
        </p>
      </footer>
    </div>
  );
}
