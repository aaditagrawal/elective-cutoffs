"use client";

import { useEffect, useRef } from "react";
import { HIGHLIGHT_VISIBLE_MS, nextHighlightScroll, type HighlightScroll } from "@/lib/ui-state";

/**
 * Scroll the highlighted card into view once it is actually in the document,
 * then drop the ring after a fixed dwell. `present` is false until the list
 * that should contain the card has committed, so a leftover node from the
 * previous list cannot count.
 */
export function useHighlightScroll(
  highlightKey: string | null,
  elementId: string | null,
  present: boolean,
  listSize: number,
  clearHighlight: () => void,
) {
  const highlightScrollRef = useRef<HighlightScroll>({ phase: "idle" });
  const dismissAtRef = useRef<number | null>(null);

  useEffect(() => {
    const element =
      present && listSize > 0 && elementId !== null ? document.getElementById(elementId) : null;
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
  }, [highlightKey, elementId, present, listSize, clearHighlight]);
}
