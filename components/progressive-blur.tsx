/**
 * Frosted edge for a sticky bar. `short` only softens the bar's own bottom
 * edge; `long` reaches into the content scrolling underneath.
 */
export function ProgressiveBlur({ feather }: { feather: "short" | "long" }) {
  return (
    <>
      <div className="cutoff-progressive-blur" data-feather={feather} aria-hidden="true">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div className="cutoff-top-wash" />
      </div>
    </>
  );
}
