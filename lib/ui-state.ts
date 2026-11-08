import type { ElectiveType, SemesterId, SortOrder } from "@/lib/electives";

/**
 * UI state for the dashboard, written as explicit transitions.
 *
 * The previous version kept semester, filters, sort, highlight, and the command
 * palette in independent `useState` hooks, then used effects to push them back
 * into agreement (reset the palette query after open, reset the selection after
 * every keystroke, restart the highlight timer whenever the grid rendered).
 * Each of those effects was a second render, and a couple of them could
 * overwrite a choice the user had already made.
 *
 * A reducer returns the next state in one shot. Returning the *same* reference
 * when nothing visible changed lets React skip the render entirely.
 */

export type BrowseSortField = "name" | "cutoff" | "students";

/** Who is allowed to change the semester. The calendar may do it once, before the user does. */
export type SemesterOwner = "fallback" | "user";

export type HighlightTarget = {
  code: string;
  electiveType: ElectiveType;
  /** Increments on every selection so choosing the same card scrolls to it again. */
  selection: number;
};

export type BrowseState = {
  semester: SemesterId;
  search: string;
  typeFilter: string;
  deptFilter: string;
  sortField: BrowseSortField;
  sortOrder: SortOrder;
  highlight: HighlightTarget | null;
  commandOpen: boolean;
};

export const initialBrowseState: BrowseState = {
  semester: "sixth",
  search: "",
  typeFilter: "all",
  deptFilter: "all",
  sortField: "cutoff",
  sortOrder: "asc",
  highlight: null,
  commandOpen: false,
};

export type BrowseAction =
  | { type: "apply-calendar"; semester: SemesterId }
  | { type: "choose-semester"; semester: SemesterId }
  | { type: "set-search"; query: string }
  | { type: "set-type"; value: string }
  | { type: "set-department"; value: string }
  | { type: "toggle-sort"; field: BrowseSortField }
  | { type: "clear-filters" }
  | { type: "select-elective"; code: string; electiveType: ElectiveType }
  | { type: "clear-highlight" }
  | { type: "open-command" }
  | { type: "close-command" }
  | { type: "toggle-command" };

const ACADEMIC_TIME_ZONE = "Asia/Kolkata";

/**
 * September–February is VI semester; March–August is VII. Evaluated in
 * Asia/Kolkata so the default flips at midnight in India, not in the build zone.
 */
export function semesterForInstant(instant: Date): SemesterId {
  const month = Number(
    new Intl.DateTimeFormat("en-US", {
      month: "numeric",
      timeZone: ACADEMIC_TIME_ZONE,
    }).format(instant),
  );
  return month >= 9 || month <= 2 ? "sixth" : "seventh";
}

/**
 * Semester the calendar may install, or `null` when the current one should stay.
 * `null` means the caller must not dispatch — a dispatch that produced the same
 * semester would still be a wasted render if the reducer weren't careful, and
 * skipping it also leaves a user choice made before hydration alone.
 */
export function calendarSemester(
  owner: SemesterOwner,
  current: SemesterId,
  proposed: SemesterId,
): SemesterId | null {
  if (owner !== "fallback") return null;
  if (current === proposed) return null;
  return proposed;
}

export function filtersAreActive(state: BrowseState): boolean {
  return state.search !== "" || state.typeFilter !== "all" || state.deptFilter !== "all";
}

/** The list is either caught up with the input or waiting on the deferred query. */
export type ResultsFreshness = "current" | "pending";

export function resultsFreshness(search: string, deferredSearch: string): ResultsFreshness {
  return search === deferredSearch ? "current" : "pending";
}

export function electiveElementId(code: string, electiveType: string): string {
  return `elective-${code}-${electiveType}`;
}

/** Identity of one highlight attempt, including the selection counter. */
export function highlightScrollKey(highlight: HighlightTarget): string {
  return `${highlight.selection}:${highlight.code}:${highlight.electiveType}`;
}

/**
 * How long a card stays highlighted after it has actually been scrolled into
 * view. This is a dwell, not a transition — the motion guidelines don't apply.
 */
export const HIGHLIGHT_VISIBLE_MS = 2000;

/**
 * Scroll progress for the highlight. Kept off the React state on purpose: moving
 * `waiting` → `shown` does not change anything on screen (the ring is already
 * drawn), so storing it in state would re-render the grid for a bookkeeping bit.
 */
export type HighlightScroll =
  | { phase: "idle" }
  | { phase: "waiting"; key: string }
  | { phase: "shown"; key: string };

export function nextHighlightScroll(
  scroll: HighlightScroll,
  highlightKey: string | null,
  elementFound: boolean,
): HighlightScroll {
  if (highlightKey === null) {
    return scroll.phase === "idle" ? scroll : { phase: "idle" };
  }
  if (scroll.phase === "shown" && scroll.key === highlightKey) return scroll;
  if (!elementFound) {
    if (scroll.phase === "waiting" && scroll.key === highlightKey) return scroll;
    return { phase: "waiting", key: highlightKey };
  }
  return { phase: "shown", key: highlightKey };
}

export function browseReducer(state: BrowseState, action: BrowseAction): BrowseState {
  switch (action.type) {
    case "apply-calendar":
      if (state.semester === action.semester) return state;
      return { ...state, semester: action.semester };
    case "choose-semester": {
      if (
        state.semester === action.semester &&
        state.search === "" &&
        state.typeFilter === "all" &&
        state.deptFilter === "all" &&
        state.highlight === null
      ) {
        return state;
      }
      return {
        ...state,
        semester: action.semester,
        search: "",
        typeFilter: "all",
        deptFilter: "all",
        highlight: null,
      };
    }
    case "set-search":
      if (state.search === action.query) return state;
      return { ...state, search: action.query };
    case "set-type":
      if (state.typeFilter === action.value) return state;
      return { ...state, typeFilter: action.value };
    case "set-department":
      if (state.deptFilter === action.value) return state;
      return { ...state, deptFilter: action.value };
    case "toggle-sort": {
      if (state.sortField === action.field) {
        const sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
        return { ...state, sortOrder };
      }
      return { ...state, sortField: action.field, sortOrder: "asc" };
    }
    case "clear-filters":
      if (!filtersAreActive(state)) return state;
      return { ...state, search: "", typeFilter: "all", deptFilter: "all" };
    case "select-elective":
      return {
        ...state,
        search: "",
        typeFilter: "all",
        deptFilter: "all",
        commandOpen: false,
        highlight: {
          code: action.code,
          electiveType: action.electiveType,
          selection: state.highlight === null ? 1 : state.highlight.selection + 1,
        },
      };
    case "clear-highlight":
      if (state.highlight === null) return state;
      return { ...state, highlight: null };
    case "open-command":
      if (state.commandOpen) return state;
      return { ...state, commandOpen: true };
    case "close-command":
      if (!state.commandOpen) return state;
      return { ...state, commandOpen: false };
    case "toggle-command":
      return { ...state, commandOpen: !state.commandOpen };
    default: {
      const unreachable: never = action;
      return unreachable;
    }
  }
}

export type PaletteState = {
  query: string;
  selectedIndex: number;
};

export const initialPaletteState: PaletteState = { query: "", selectedIndex: 0 };

export type PaletteAction =
  | { type: "query"; query: string }
  | { type: "move"; direction: "next" | "previous"; count: number };

/**
 * Query and selection are one transition. Resetting the index in an effect
 * after `setQuery` rendered a frame with the previous row still highlighted,
 * then rendered again.
 */
export function paletteReducer(state: PaletteState, action: PaletteAction): PaletteState {
  switch (action.type) {
    case "query":
      if (action.query === state.query && state.selectedIndex === 0) return state;
      return { query: action.query, selectedIndex: 0 };
    case "move": {
      if (action.count <= 0) {
        return state.selectedIndex === 0 ? state : { query: state.query, selectedIndex: 0 };
      }
      const last = action.count - 1;
      const selectedIndex =
        action.direction === "next"
          ? Math.min(state.selectedIndex + 1, last)
          : Math.max(state.selectedIndex - 1, 0);
      if (selectedIndex === state.selectedIndex) return state;
      return { query: state.query, selectedIndex };
    }
    default: {
      const unreachable: never = action;
      return unreachable;
    }
  }
}
