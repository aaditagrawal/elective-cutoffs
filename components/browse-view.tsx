"use client";

import { classNames, difficultyClassNames } from "@/ui.stylex";
import type { DashboardChrome } from "@/components/dashboard-chrome";
import { ElectiveResults } from "@/components/elective-results";
import { useHighlightScroll } from "@/components/highlight-scroll";
import {
  filterElectives,
  getCoursePageUrl,
  getDepartments,
  getDifficultyLevel,
  getElectiveTypes,
  getStats,
  searchTopK,
  semesterDatasets,
  type Elective,
  type SemesterId,
} from "@/lib/electives";
import {
  electiveElementId,
  highlightScrollKey,
  initialPaletteState,
  paletteReducer,
  type BrowseSortField,
  type HighlightTarget,
} from "@/lib/ui-state";
import { ExternalLink, GraduationCap, Info, Search, X } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useReducer, useRef } from "react";

const PALETTE_RESULTS = 8;

export function chromeFor(semester: SemesterId): DashboardChrome {
  const dataset = semesterDatasets[semester];
  const stats = getStats(dataset.electives);
  return {
    academicYear: dataset.metadata.academicYear,
    semesterLabel: dataset.metadata.semester,
    totalElectives: stats.totalElectives,
    departmentCount: stats.departments,
    lowestCutoff: stats.lowestCutoff,
    highestCutoff: stats.highestCutoff,
    oeCount: stats.oeCount,
    programElectiveCount: stats.programElectiveCount,
    types: getElectiveTypes(dataset.electives),
    departments: getDepartments(dataset.electives),
  };
}

function CommandSearchImpl({
  onClose,
  onSelect,
  semester,
}: {
  onClose: () => void;
  onSelect: (elective: Elective) => void;
  semester: SemesterId;
}) {
  const electives = semesterDatasets[semester].electives;
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

  const results = useMemo(() => searchTopK(electives, query, PALETTE_RESULTS), [electives, query]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    const selected = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          dispatchPalette({ type: "move", direction: "next", count: results.length });
          break;
        case "ArrowUp":
          event.preventDefault();
          dispatchPalette({ type: "move", direction: "previous", count: results.length });
          break;
        case "Enter":
          event.preventDefault();
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
      <button
        type="button"
        aria-label="Close search"
        className={classNames.electiveDashboard25}
        onClick={onClose}
      />
      <div
        className={classNames.electiveDashboard26}
        role="dialog"
        aria-modal="true"
        aria-label="Search electives"
      >
        <div className={classNames.electiveDashboard27}>
          <div className={classNames.electiveDashboard28}>
            <Search className={classNames.electiveDashboard29} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => dispatchPalette({ type: "query", query: event.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="Search electives..."
              className={classNames.electiveDashboard30}
            />
            <button onClick={onClose} className={classNames.electiveDashboard31}>
              <X className={classNames.electiveDashboard32} />
            </button>
          </div>
          <div ref={listRef} className={classNames.electiveDashboard33}>
            {results.length === 0 ? (
              <div className={classNames.electiveDashboard34}>
                No electives found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              results.map((elective, index) => {
                const difficulty = getDifficultyLevel(elective.lowestCGPA);
                const courseUrl = getCoursePageUrl(elective.code);
                return (
                  <div key={`${elective.code}-${elective.type}`}>
                    <button
                      data-index={index}
                      onClick={() => {
                        onSelect(elective);
                        onClose();
                      }}
                      className={`${classNames.electiveDashboard37} ${
                        index === selectedIndex
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
                    {courseUrl ? (
                      <a
                        href={courseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classNames.electiveDashboard46}
                        aria-label={`Course details for ${elective.name}`}
                      >
                        Course details
                      </a>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
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

export const CommandOverlay = memo(CommandSearchImpl);

export function LiveResults({
  semester,
  search,
  typeFilter,
  deptFilter,
  sortField,
  sortOrder,
  highlight,
  pending,
  filtersActive,
  onClearFilters,
  onClearHighlight,
}: {
  semester: SemesterId;
  search: string;
  typeFilter: string;
  deptFilter: string;
  sortField: BrowseSortField;
  sortOrder: "asc" | "desc";
  highlight: HighlightTarget | null;
  pending: boolean;
  filtersActive: boolean;
  onClearFilters: () => void;
  onClearHighlight: () => void;
}) {
  const dataset = semesterDatasets[semester];
  const filtered = useMemo(
    () => filterElectives(dataset.electives, typeFilter, deptFilter, search, sortField, sortOrder),
    [dataset.electives, typeFilter, deptFilter, search, sortField, sortOrder],
  );
  const highlightKey = highlight === null ? null : highlightScrollKey(highlight);
  const elementId =
    highlight === null ? null : electiveElementId(highlight.code, highlight.electiveType);
  let present = false;
  if (highlight !== null) {
    for (let i = 0; i < filtered.length; i++) {
      const elective = filtered[i];
      if (elective.code === highlight.code && elective.type === highlight.electiveType) {
        present = true;
        break;
      }
    }
  }
  useHighlightScroll(highlightKey, elementId, present, filtered.length, onClearHighlight);

  return (
    <ElectiveResults
      electives={filtered}
      academicYear={dataset.metadata.academicYear}
      semesterLabel={dataset.metadata.semester}
      highlightCode={highlight === null ? null : highlight.code}
      highlightType={highlight === null ? null : highlight.electiveType}
      pending={pending}
      aside={
        filtersActive ? (
          <button onClick={onClearFilters} className={classNames.electiveDashboard114}>
            Clear Filters
          </button>
        ) : null
      }
    />
  );
}
