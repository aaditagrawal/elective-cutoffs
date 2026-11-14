// Run in a production page's console or preview_evaluate. Local lab data only.
(async () => {
  scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 250));
  const frames = [];
  let last;
  for (let i = 0; i < 90; i++) {
    const now = await new Promise(requestAnimationFrame);
    if (last !== undefined) frames.push(now - last);
    last = now;
    scrollBy(0, 45);
  }
  await new Promise((r) => setTimeout(r, 200));
  const a = [...frames].sort((a, b) => a - b);
  return {
    visibility: document.visibilityState,
    frames,
    median: a[Math.floor(a.length / 2)],
    p95: a[Math.floor(a.length * 0.95)],
    over50: frames.filter((x) => x > 50).length,
    scrollRestored: !document.documentElement.hasAttribute("data-scrolling"),
    scrollY,
  };
})();
