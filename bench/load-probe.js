// Run in a production page's console or preview_evaluate. Local lab data only.
(async () => {
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const buffered = async (type) => {
    const values = [];
    const o = new PerformanceObserver((l) => values.push(...l.getEntries().map((x) => x.toJSON())));
    o.observe({ type, buffered: true });
    await new Promise((r) => setTimeout(r, 20));
    o.disconnect();
    return values;
  };
  const nav = performance.getEntriesByType("navigation")[0];
  const res = performance.getEntriesByType("resource");
  return {
    html: nav.decodedBodySize,
    htmlTransfer: nav.encodedBodySize,
    ttfb: nav.responseStart,
    dom: nav.domContentLoadedEventEnd,
    fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime,
    lcp: await buffered("largest-contentful-paint"),
    longtasks: await buffered("longtask"),
    scripts: res
      .filter((x) => x.name.includes("/chunks/") && x.name.endsWith(".js"))
      .reduce((a, x) => a + x.decodedBodySize, 0),
    rsc: res
      .filter((x) => x.name.includes("_rsc"))
      .map((x) => ({ url: x.name, bytes: x.decodedBodySize })),
    cards: document.querySelectorAll('[id^="elective-"]').length,
  };
})();
