"use client";

import { classNames, difficultyClassNames } from "@/ui.stylex";

import { useState, useEffect, useRef, useCallback, useMemo, useDeferredValue, memo } from "react";
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
  type SemesterId,
  type Elective,
} from "@/lib/electives";
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
} from "lucide-react";

/** How many results the command palette shows. */
const PALETTE_RESULTS = 8;

// Command Search Modal
function CommandSearchImpl({
  isOpen,
  onClose,
  onSelect,
  electives,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (elective: Elective) => void;
  electives: Elective[];
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Recomputed only when the query or dataset changes. Without the memo this
  // re-ran on every render of this component — including every arrow-key press,
  // which only moves the selection highlight and cannot change the results.
  const results = useMemo(() => searchTopK(electives, query, PALETTE_RESULTS), [electives, query]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
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

  if (!isOpen) return null;

  return (
    <div className={classNames.electiveDashboard24} role="presentation">
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
              onChange={(e) => setQuery(e.target.value)}
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
                  <button
                    key={`${elective.code}-${elective.type}`}
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
                      {courseUrl ? (
                        <a
                          href={courseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={classNames.electiveDashboard46}
                        >
                          {elective.name}
                        </a>
                      ) : (
                        <div className={classNames.electiveDashboard47}>{elective.name}</div>
                      )}
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

// Memoized: the dashboard re-renders on every keystroke, but the palette's props
// (isOpen, the two callbacks, the dataset) change only when it is actually opened
// or the semester is switched.
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
      id={`elective-${elective.code}-${elective.type}`}
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
  const [semester, setSemester] = useState<SemesterId>("seventh");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "cutoff" | "students">("cutoff");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [commandOpen, setCommandOpen] = useState(false);
  const [highlightedElective, setHighlightedElective] = useState<string | null>(null);
  // Which highlight id we have already scrolled to, so the effect below
  // scrolls once per selection rather than on every grid update.
  const scrolledForRef = useRef<string | null>(null);

  const dataset = semesterDatasets[semester];
  const electiveData = dataset.electives;
  const electiveTypes = useMemo(() => getElectiveTypes(electiveData), [electiveData]);
  const stats = useMemo(() => getStats(electiveData), [electiveData]);
  const departments = useMemo(() => getDepartments(electiveData), [electiveData]);

  // The input stays on `search` so typing is never held up; the grid renders
  // from the deferred value, letting React keep the keystroke responsive and
  // drop intermediate list renders when typing outpaces rendering.
  const deferredSearch = useDeferredValue(search);

  const filteredElectives = useMemo(() => {
    return filterElectives(electiveData, typeFilter, deptFilter, deferredSearch, sortBy, sortOrder);
  }, [electiveData, typeFilter, deptFilter, deferredSearch, sortBy, sortOrder]);

  // Keyboard shortcut for Ctrl+K (toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectElective = useCallback((elective: Elective) => {
    // Clear filters so the selected elective is in the grid
    setSearch("");
    setTypeFilter("all");
    setDeptFilter("all");

    // Allow re-selecting the same elective to scroll to it again.
    scrolledForRef.current = null;
    setHighlightedElective(`elective-${elective.code}-${elective.type}`);
  }, []);

  /**
   * Scroll to the highlighted card once the grid has actually rendered it.
   *
   * This used to be a fixed 100ms `setTimeout` inside the selection handler,
   * which is a race: the grid renders from `deferredSearch`, so after the
   * handler clears `search` React may still paint one frame with the old
   * query — and on a busy or slow browser more than one. If the card is not
   * in the DOM when the timer fires, the scroll silently does nothing.
   *
   * Keying the effect on `filteredElectives` removes the guess. If the card
   * isn't there yet, the effect simply re-runs when the deferred grid catches
   * up, and the ref keeps it to one scroll per selection.
   */
  useEffect(() => {
    if (!highlightedElective) return;

    if (scrolledForRef.current !== highlightedElective) {
      const element = document.getElementById(highlightedElective);
      if (!element) return; // not rendered yet — re-runs when the grid updates
      scrolledForRef.current = highlightedElective;
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const timer = setTimeout(() => setHighlightedElective(null), 2000);
    return () => clearTimeout(timer);
  }, [highlightedElective, filteredElectives]);

  // Stable identity so the memoized palette isn't invalidated on every render.
  const handleCloseCommand = useCallback(() => setCommandOpen(false), []);

  const handleSemesterChange = useCallback((nextSemester: SemesterId) => {
    setSemester(nextSemester);
    setSearch("");
    setTypeFilter("all");
    setDeptFilter("all");
    setHighlightedElective(null);
  }, []);

  // Left un-memoized on purpose: it depends on `sortBy`, so a `useCallback`
  // would be invalidated exactly when it is used, and the sort buttons are
  // plain DOM elements that gain nothing from a stable callback identity.
  const toggleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  return (
    <div className={classNames.electiveDashboard83}>
      {/* Command Search Modal */}
      <CommandSearch
        isOpen={commandOpen}
        onClose={handleCloseCommand}
        onSelect={handleSelectElective}
        electives={electiveData}
      />

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
            <button onClick={() => setCommandOpen(true)} className={classNames.electiveDashboard95}>
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
                onChange={(e) => setSearch(e.target.value)}
                className={classNames.electiveDashboard104}
              />
            </div>

            {/* Type and Department Filters - side by side on mobile */}
            <div className={classNames.electiveDashboard105}>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
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

              <Select value={deptFilter} onValueChange={setDeptFilter}>
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
                  sortBy === "cutoff"
                    ? classNames.electiveDashboard108
                    : classNames.electiveDashboard109
                }`}
              >
                Cutoff {sortBy === "cutoff" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => toggleSort("students")}
                className={`${classNames.electiveDashboard110} ${
                  sortBy === "students"
                    ? classNames.electiveDashboard108
                    : classNames.electiveDashboard109
                }`}
              >
                Students {sortBy === "students" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => toggleSort("name")}
                className={`${classNames.electiveDashboard110} ${
                  sortBy === "name"
                    ? classNames.electiveDashboard108
                    : classNames.electiveDashboard109
                }`}
              >
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={classNames.electiveDashboard111}>
        <div className={classNames.electiveDashboard112}>
          <h2 className={classNames.electiveDashboard113}>
            {filteredElectives.length} Elective{filteredElectives.length !== 1 ? "s" : ""} Found
          </h2>
          {search || typeFilter !== "all" || deptFilter !== "all" ? (
            <button
              onClick={() => {
                setSearch("");
                setTypeFilter("all");
                setDeptFilter("all");
              }}
              className={classNames.electiveDashboard114}
            >
              Clear Filters
            </button>
          ) : null}
        </div>

        {/* Electives Grid */}
        <div className={classNames.electiveDashboard115}>
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
              isHighlighted={highlightedElective === `elective-${elective.code}-${elective.type}`}
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
