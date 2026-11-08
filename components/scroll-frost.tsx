"use client";

import { useEffect } from "react";

/**
 * Backdrop filters on the sticky bars resample the whole viewport every frame.
 * While the page is moving, the bars keep their tint and drop the blur, then
 * the frost comes back once scrolling settles.
 */
export function ScrollFrost() {
  useEffect(() => {
    let timer = 0;
    let scrolling = false;
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        document.documentElement.dataset.scrolling = "";
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        scrolling = false;
        delete document.documentElement.dataset.scrolling;
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      delete document.documentElement.dataset.scrolling;
    };
  }, []);
  return null;
}
