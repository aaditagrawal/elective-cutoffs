# StyleX migration

The dashboard, FAQ, examples, and shared UI components use compiled StyleX styles instead of Tailwind utilities. The original reset, theme values, compound selectors, and animations remain explicit CSS. Semantic state classes retain selectors involving descendants, slots, and ARIA attributes. `cn` composes registered StyleX groups while retaining these state markers.

The Babel loader applies only to `*.stylex.js`; Next continues compiling application code and fonts normally. Babel and PostCSS share `stylex.config.cjs`. The reset begins with the complete layer order because Next hoists CSS imports before declarations in the importing stylesheet. Difficulty colors keep their existing data values and are mapped to styles only in the UI, so standalone data scripts remain independent of the styling compiler.

Validation against the unchanged baseline:

- Production build, TypeScript, Oxlint, and Oxfmt pass. Existing lint warnings remain.
- All 106,681 benchmark correctness scenarios pass.
- The default dashboard's 8,099 DOM elements have identical computed CSS, rectangles, and text at widths 375, 639, 640, 767, 768, 1023, 1024, 1280, and 1440.
- FAQ parity passes at four widths. Semester selection, filtering, sorting, and command dialog states pass at mobile and desktop widths, including ARIA attributes.
- FAQ and populated command dialog screenshots at desktop width are byte-identical.
- A temporary development fixture covering all 48 Button variant/size combinations, six Badge variants, Field, and InputGroup has identical computed CSS, rectangles, text, and ARIA attributes across 223 elements at mobile and desktop widths. Disabled, invalid, and expanded states also match. The fixture was removed before publication.

The port preserves existing visuals and behavior; it does not claim a runtime performance improvement.
