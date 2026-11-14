/** Paste this expression into the production page's console or preview_evaluate.
 * Measures DOM commit latency, excluding the next frame's display interval.
 * Synthetic input is a repeatable lab workload, not a field INP measurement.
 */
(async () => {
  const input = document.querySelector('input[placeholder="Search electives..."]');
  if (!input) throw new Error("Dashboard search input is missing");
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
  const pause = () =>
    new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const heading = () =>
    [...document.querySelectorAll("h2")].find(
      (element) => element.getBoundingClientRect().height > 0,
    )?.textContent;
  const samples = [];
  const expected = { machine: 4, data: 5, zzzzzz: 0, a: 114, "": 139 };
  for (let repeat = 0; repeat < 3; repeat++) {
    for (const query of ["machine", "data", "zzzzzz", "a", ""]) {
      const start = performance.now();
      const committed = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          observer.disconnect();
          reject(new Error(`Search timed out: ${query}`));
        }, 5000);
        const observer = new MutationObserver(() => {
          if (document.querySelector('[aria-busy="true"]')) return;
          if (heading() !== `${expected[query]} Electives Found`) return;
          observer.disconnect();
          clearTimeout(timeout);
          resolve(performance.now() - start);
        });
        observer.observe(document.body, {
          subtree: true,
          childList: true,
          characterData: true,
          attributes: true,
        });
      });
      setter.call(input, query);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      const ms = await committed;
      samples.push({ repeat, query, ms, heading: heading() });
      await pause();
    }
  }
  return { userAgent: navigator.userAgent, samples };
})();
