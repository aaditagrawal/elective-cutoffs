import * as stylex from "@stylexjs/stylex";
export const styles = stylex.create({
  // Original utility group: min-h-screen bg-neutral-950 text-white
  home0: {
    minHeight: "100vh",
    backgroundColor: "var(--color-neutral-950)",
    color: "var(--color-white)",
  },
  // Original utility group: max-w-3xl mx-auto px-6 py-12
  home1: {
    marginInline: "auto",
    maxWidth: "var(--container-3xl)",
    paddingInline: "calc(var(--spacing) * 6)",
    paddingBlock: "calc(var(--spacing) * 12)",
  },
  // Original utility group: text-4xl font-serif mb-2
  home2: {
    marginBottom: "calc(var(--spacing) * 2)",
    fontFamily: "var(--font-instrument-serif), ui-serif, Georgia, serif",
    fontSize: "var(--text-4xl)",
    lineHeight: "var(--tw-leading, var(--text-4xl--line-height))",
    "--tw-leading": null,
  },
  // Original utility group: text-neutral-400 mb-8
  home3: {
    marginBottom: "calc(var(--spacing) * 8)",
    color: "var(--color-neutral-400)",
  },
  // Original utility group: space-y-4
  home4: {},
  // Original utility group: bg-neutral-900/50 border-neutral-800
  home5: {
    borderColor: "var(--color-neutral-800)",
    backgroundColor: "#17171780",
  },
  // Original utility group: pt-6
  home6: {
    paddingTop: "calc(var(--spacing) * 6)",
  },
  // Original utility group: text-lg font-medium mb-2
  home7: {
    marginBottom: "calc(var(--spacing) * 2)",
    fontSize: "var(--text-lg)",
    lineHeight: "var(--tw-leading, var(--text-lg--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
    "--tw-leading": null,
  },
  // Original utility group: text-neutral-400
  home8: {
    color: "var(--color-neutral-400)",
  },
  // Original utility group: font-sans antialiased
  layout9: {
    fontFamily: "var(--font-instrument-sans), ui-sans-serif, system-ui, sans-serif",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  // Original utility group: border-b border-white/5 bg-neutral-950 z-50
  layout10: {
    zIndex: "50",
    borderBottomStyle: "var(--tw-border-style)",
    borderBottomWidth: "1px",
    borderColor: "#ffffff0d",
    backgroundColor: "var(--color-neutral-950)",
  },
  // Original utility group: max-w-7xl mx-auto flex items-center justify-between px-6 py-4
  layout11: {
    marginInline: "auto",
    display: "flex",
    maxWidth: "var(--container-7xl)",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "calc(var(--spacing) * 6)",
    paddingBlock: "calc(var(--spacing) * 4)",
  },
  // Original utility group: text-xl font-serif text-white
  layout12: {
    fontFamily: "var(--font-instrument-serif), ui-serif, Georgia, serif",
    fontSize: "var(--text-xl)",
    lineHeight: "var(--tw-leading, var(--text-xl--line-height))",
    color: "var(--color-white)",
    "--tw-leading": null,
  },
  // Original utility group: flex gap-6
  layout13: {
    display: "flex",
    gap: "calc(var(--spacing) * 6)",
  },
  // Original utility group: text-neutral-400 hover:text-white transition-colors
  layout14: {
    color: "var(--color-neutral-400)",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
  },
  // Original utility group: items-center justify-center
  // Original utility group: relative w-full max-w-sm overflow-hidden pt-0
  // Original utility group: bg-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color
  // Original utility group: relative z-20 aspect-video w-full object-cover brightness-60 grayscale
  // Original utility group: ml-auto
  // Original utility group: w-full max-w-md
  // Original utility group: sr-only
  // Original utility group: w-56
  // Original utility group: grid grid-cols-2 gap-4
  // Original utility group: fixed inset-0 z-50
  electiveDashboard24: {
    position: "fixed",
    inset: "0",
    zIndex: "50",
  },
  // Original utility group: absolute inset-0 bg-black/60 backdrop-blur-sm
  electiveDashboard25: {
    position: "absolute",
    inset: "0",
    backgroundColor: "#0009",
    "--tw-backdrop-blur": "blur(var(--blur-sm))",
    backdropFilter:
      "var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, )",
  },
  // Original utility group: relative max-w-2xl mx-auto mt-[15vh]
  electiveDashboard26: {
    position: "relative",
    marginInline: "auto",
    marginTop: "15vh",
    maxWidth: "var(--container-2xl)",
  },
  // Original utility group: bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden
  electiveDashboard27: {
    overflow: "hidden",
    borderRadius: "calc(var(--radius) + 4px)",
    borderStyle: "var(--tw-border-style)",
    borderWidth: "1px",
    borderColor: "#ffffff1a",
    backgroundColor: "var(--color-neutral-900)",
    "--tw-shadow": "0 25px 50px -12px var(--tw-shadow-color, #00000040)",
    boxShadow:
      "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
  },
  // Original utility group: flex items-center border-b border-white/10 px-4
  electiveDashboard28: {
    display: "flex",
    alignItems: "center",
    borderBottomStyle: "var(--tw-border-style)",
    borderBottomWidth: "1px",
    borderColor: "#ffffff1a",
    paddingInline: "calc(var(--spacing) * 4)",
  },
  // Original utility group: h-5 w-5 text-neutral-500 shrink-0
  electiveDashboard29: {
    height: "calc(var(--spacing) * 5)",
    width: "calc(var(--spacing) * 5)",
    flexShrink: "0",
    color: "var(--color-neutral-500)",
  },
  // Original utility group: flex-1 bg-transparent py-4 px-3 text-white placeholder:text-neutral-500 outline-none text-lg
  electiveDashboard30: {
    flex: "1",
    backgroundColor: "#0000",
    paddingInline: "calc(var(--spacing) * 3)",
    paddingBlock: "calc(var(--spacing) * 4)",
    fontSize: "var(--text-lg)",
    lineHeight: "var(--tw-leading, var(--text-lg--line-height))",
    color: "var(--color-white)",
    "--tw-outline-style": "none",
    outlineStyle: "none",
    "--tw-leading": null,
  },
  // Original utility group: p-1 rounded hover:bg-white/10 transition-colors
  electiveDashboard31: {
    borderRadius: ".25rem",
    padding: "var(--spacing)",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
  },
  // Original utility group: h-4 w-4 text-neutral-500
  electiveDashboard32: {
    height: "calc(var(--spacing) * 4)",
    width: "calc(var(--spacing) * 4)",
    color: "var(--color-neutral-500)",
  },
  // Original utility group: max-h-[50vh] overflow-y-auto py-2
  electiveDashboard33: {
    maxHeight: "50vh",
    overflowY: "auto",
    paddingBlock: "calc(var(--spacing) * 2)",
  },
  // Original utility group: px-4 py-8 text-center text-neutral-500
  electiveDashboard34: {
    paddingInline: "calc(var(--spacing) * 4)",
    paddingBlock: "calc(var(--spacing) * 8)",
    textAlign: "center",
    color: "var(--color-neutral-500)",
  },
  // Original utility group: bg-white/10
  electiveDashboard35: {
    backgroundColor: "#ffffff1a",
  },
  // Original utility group: hover:bg-white/5
  electiveDashboard36: {},
  // Original utility group: w-full px-4 py-3 flex items-start gap-3 text-left transition-colors
  electiveDashboard37: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    gap: "calc(var(--spacing) * 3)",
    paddingInline: "calc(var(--spacing) * 4)",
    paddingBlock: "calc(var(--spacing) * 3)",
    textAlign: "left",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
  },
  // Original utility group: shrink-0 mt-0.5
  electiveDashboard38: {
    marginTop: "calc(var(--spacing) * .5)",
    flexShrink: "0",
  },
  // Original utility group: h-5 w-5 text-neutral-500
  electiveDashboard39: {
    height: "calc(var(--spacing) * 5)",
    width: "calc(var(--spacing) * 5)",
    color: "var(--color-neutral-500)",
  },
  // Original utility group: flex-1 min-w-0
  electiveDashboard40: {
    minWidth: "0",
    flex: "1",
  },
  // Original utility group: flex items-center gap-2
  electiveDashboard41: {
    display: "flex",
    alignItems: "center",
    gap: "calc(var(--spacing) * 2)",
  },
  // Original utility group: text-xs font-mono text-neutral-500
  electiveDashboard42: {
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-500)",
    "--tw-leading": null,
  },
  // Original utility group: h-3 w-3 text-emerald-400
  electiveDashboard43: {
    height: "calc(var(--spacing) * 3)",
    width: "calc(var(--spacing) * 3)",
    color: "var(--color-emerald-400)",
  },
  // Original utility group: h-3 w-3 text-neutral-600
  electiveDashboard44: {
    height: "calc(var(--spacing) * 3)",
    width: "calc(var(--spacing) * 3)",
    color: "var(--color-neutral-600)",
  },
  // Original utility group: text-xs font-mono text-neutral-300 bg-neutral-700 px-1.5 py-0.5 rounded
  electiveDashboard45: {
    borderRadius: ".25rem",
    backgroundColor: "var(--color-neutral-700)",
    paddingInline: "calc(var(--spacing) * 1.5)",
    paddingBlock: "calc(var(--spacing) * .5)",
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-300)",
    "--tw-leading": null,
  },
  // Original utility group: text-white font-medium truncate mt-0.5 hover:text-neutral-200 hover:underline block
  electiveDashboard46: {
    marginTop: "calc(var(--spacing) * .5)",
    display: "block",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-white)",
  },
  // Original utility group: text-neutral-400 font-medium truncate mt-0.5
  electiveDashboard47: {
    marginTop: "calc(var(--spacing) * .5)",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-neutral-400)",
  },
  // Original utility group: text-xs text-neutral-500 mt-0.5
  electiveDashboard48: {
    marginTop: "calc(var(--spacing) * .5)",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-500)",
    "--tw-leading": null,
  },
  // Original utility group: font-mono
  electiveDashboard49: {
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
  },
  // Original utility group: text-xs font-medium shrink-0
  electiveDashboard50: {
    flexShrink: "0",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
    "--tw-leading": null,
  },
  // Original utility group: border-t border-white/10 px-4 py-2 flex items-center gap-4 text-xs text-neutral-500
  electiveDashboard51: {
    display: "flex",
    alignItems: "center",
    gap: "calc(var(--spacing) * 4)",
    borderTopStyle: "var(--tw-border-style)",
    borderTopWidth: "1px",
    borderColor: "#ffffff1a",
    paddingInline: "calc(var(--spacing) * 4)",
    paddingBlock: "calc(var(--spacing) * 2)",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-500)",
    "--tw-leading": null,
  },
  // Original utility group: flex items-center gap-1
  electiveDashboard52: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing)",
  },
  // Original utility group: px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400 font-mono
  electiveDashboard53: {
    borderRadius: ".25rem",
    backgroundColor: "var(--color-neutral-800)",
    paddingInline: "calc(var(--spacing) * 1.5)",
    paddingBlock: "calc(var(--spacing) * .5)",
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    color: "var(--color-neutral-400)",
  },
  // Original utility group: relative overflow-hidden border-white/10 bg-neutral-900/50 backdrop-blur-sm
  electiveDashboard54: {
    position: "relative",
    overflow: "hidden",
    borderColor: "#ffffff1a",
    backgroundColor: "#17171780",
    "--tw-backdrop-blur": "blur(var(--blur-sm))",
    backdropFilter:
      "var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, )",
  },
  // Original utility group: flex flex-row items-center justify-between pb-2
  electiveDashboard55: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "calc(var(--spacing) * 2)",
  },
  // Original utility group: text-sm font-medium text-neutral-400
  electiveDashboard56: {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-neutral-400)",
    "--tw-leading": null,
  },
  // Original utility group: text-2xl font-bold text-white
  electiveDashboard57: {
    fontSize: "var(--text-2xl)",
    lineHeight: "var(--tw-leading, var(--text-2xl--line-height))",
    "--tw-font-weight": "var(--font-weight-bold)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-white)",
    "--tw-leading": null,
  },
  // Original utility group: text-xs text-neutral-500 mt-1
  electiveDashboard58: {
    marginTop: "var(--spacing)",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-500)",
    "--tw-leading": null,
  },
  // Original utility group: ring-2 ring-white/30 border-white/30
  electiveDashboard59: {
    borderColor: "#ffffff4d",
    "--tw-ring-shadow":
      "var(--tw-ring-inset, ) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor)",
    boxShadow:
      "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
    "--tw-ring-color": "#ffffff4d",
  },
  // Original utility group: group relative overflow-hidden border-white/5 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80 h-full
  electiveDashboard60: {
    position: "relative",
    height: "100%",
    overflow: "hidden",
    borderColor: "#ffffff0d",
    backgroundColor: "#17171780",
    "--tw-backdrop-blur": "blur(var(--blur-sm))",
    backdropFilter:
      "var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, )",
    transitionProperty: "all",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: ".3s",
    "--tw-duration": ".3s",
  },
  // Original utility group: pb-3
  electiveDashboard61: {
    paddingBottom: "calc(var(--spacing) * 3)",
  },
  // Original utility group: flex items-start justify-between gap-2
  electiveDashboard62: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "calc(var(--spacing) * 2)",
  },
  // Original utility group: text-xs font-mono bg-neutral-800 text-neutral-300 border-0
  electiveDashboard63: {
    borderStyle: "var(--tw-border-style)",
    borderWidth: "0",
    backgroundColor: "var(--color-neutral-800)",
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-300)",
    "--tw-leading": null,
  },
  // Original utility group: hover:opacity-80 transition-opacity
  electiveDashboard64: {
    transitionProperty: "opacity",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
  },
  // Original utility group: text-xs font-mono border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-300 cursor-pointer
  electiveDashboard65: {
    cursor: "pointer",
    borderColor: "var(--color-neutral-700)",
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-400)",
    "--tw-leading": null,
  },
  // Original utility group: ml-1 h-3 w-3
  electiveDashboard66: {
    marginLeft: "var(--spacing)",
    height: "calc(var(--spacing) * 3)",
    width: "calc(var(--spacing) * 3)",
  },
  // Original utility group: text-xs font-mono border-neutral-700 text-neutral-400
  electiveDashboard67: {
    borderColor: "var(--color-neutral-700)",
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-400)",
    "--tw-leading": null,
  },
  // Original utility group: hover:text-neutral-200 transition-colors
  electiveDashboard68: {
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
  },
  // Original utility group: text-base font-semibold leading-tight mt-2 line-clamp-2 text-white hover:underline
  electiveDashboard69: {
    marginTop: "calc(var(--spacing) * 2)",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    fontSize: "var(--text-base)",
    lineHeight: "var(--leading-tight)",
    "--tw-leading": "var(--leading-tight)",
    "--tw-font-weight": "var(--font-weight-semibold)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-white)",
  },
  // Original utility group: text-base font-semibold leading-tight mt-2 line-clamp-2 text-neutral-400
  electiveDashboard70: {
    marginTop: "calc(var(--spacing) * 2)",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    fontSize: "var(--text-base)",
    lineHeight: "var(--leading-tight)",
    "--tw-leading": "var(--leading-tight)",
    "--tw-font-weight": "var(--font-weight-semibold)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-neutral-400)",
  },
  // Original utility group: grid grid-cols-3 gap-3 text-center
  electiveDashboard71: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "calc(var(--spacing) * 3)",
    textAlign: "center",
  },
  // Original utility group: space-y-1
  electiveDashboard72: {},
  // Original utility group: text-xs text-neutral-500
  electiveDashboard73: {
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-500)",
    "--tw-leading": null,
  },
  // Original utility group: text-lg font-bold font-mono
  electiveDashboard74: {
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "var(--text-lg)",
    lineHeight: "var(--tw-leading, var(--text-lg--line-height))",
    "--tw-font-weight": "var(--font-weight-bold)",
    fontWeight: "var(--font-weight-bold)",
    "--tw-leading": null,
  },
  // Original utility group: text-lg font-semibold font-mono text-neutral-300
  electiveDashboard75: {
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "var(--text-lg)",
    lineHeight: "var(--tw-leading, var(--text-lg--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-neutral-300)",
    "--tw-leading": null,
  },
  // Original utility group: mt-3 pt-3 border-t border-white/5
  electiveDashboard76: {
    marginTop: "calc(var(--spacing) * 3)",
    borderTopStyle: "var(--tw-border-style)",
    borderTopWidth: "1px",
    borderColor: "#ffffff0d",
    paddingTop: "calc(var(--spacing) * 3)",
  },
  // Original utility group: flex items-center justify-between text-xs
  electiveDashboard77: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    "--tw-leading": null,
  },
  // Original utility group: text-neutral-500
  electiveDashboard78: {
    color: "var(--color-neutral-500)",
  },
  // Original utility group: font-medium
  electiveDashboard79: {
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
  },
  // Original utility group: mt-2 h-2 bg-neutral-800 rounded-full overflow-hidden
  electiveDashboard80: {
    marginTop: "calc(var(--spacing) * 2)",
    height: "calc(var(--spacing) * 2)",
    overflow: "hidden",
    borderRadius: "3.40282e38px",
    backgroundColor: "var(--color-neutral-800)",
  },
  // Original utility group: h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full
  electiveDashboard81: {
    height: "100%",
    borderRadius: "3.40282e38px",
    "--tw-gradient-position": "to right in oklab",
    backgroundImage: "linear-gradient(var(--tw-gradient-stops))",
    "--tw-gradient-from": "var(--color-emerald-500)",
    "--tw-gradient-stops":
      "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
    "--tw-gradient-via": "var(--color-yellow-500)",
    "--tw-gradient-via-stops":
      "var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)",
    "--tw-gradient-to": "var(--color-red-500)",
  },
  // Original utility group: flex justify-between text-[10px] text-neutral-600 mt-1 font-mono
  electiveDashboard82: {
    marginTop: "var(--spacing)",
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "10px",
    color: "var(--color-neutral-600)",
    "--tw-leading": null,
  },
  // Original utility group: min-h-screen bg-neutral-950
  electiveDashboard83: {
    minHeight: "100vh",
    backgroundColor: "var(--color-neutral-950)",
  },
  // Original utility group: relative overflow-hidden border-b border-white/5
  electiveDashboard84: {
    position: "relative",
    overflow: "hidden",
    borderBottomStyle: "var(--tw-border-style)",
    borderBottomWidth: "1px",
    borderColor: "#ffffff0d",
  },
  // Original utility group: absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black
  electiveDashboard85: {
    position: "absolute",
    inset: "0",
    "--tw-gradient-position": "to bottom right in oklab",
    backgroundImage: "linear-gradient(var(--tw-gradient-stops))",
    "--tw-gradient-from": "var(--color-neutral-900)",
    "--tw-gradient-stops":
      "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))",
    "--tw-gradient-via": "var(--color-neutral-950)",
    "--tw-gradient-via-stops":
      "var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)",
    "--tw-gradient-to": "var(--color-black)",
  },
  // Original utility group: relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8
  electiveDashboard86: {
    position: "relative",
    marginInline: "auto",
    maxWidth: "var(--container-7xl)",
    paddingInline: "calc(var(--spacing) * 4)",
    paddingBlock: "calc(var(--spacing) * 12)",
  },
  // Original utility group: text-center
  electiveDashboard87: {
    textAlign: "center",
  },
  // Original utility group: text-4xl sm:text-5xl font-serif text-white tracking-tight
  electiveDashboard88: {
    fontFamily: "var(--font-instrument-serif), ui-serif, Georgia, serif",
    fontSize: "var(--text-4xl)",
    lineHeight: "var(--tw-leading, var(--text-4xl--line-height))",
    "--tw-tracking": "var(--tracking-tight)",
    letterSpacing: "var(--tracking-tight)",
    color: "var(--color-white)",
    "--tw-leading": null,
  },
  // Original utility group: mt-3 text-lg text-neutral-400 max-w-2xl mx-auto
  electiveDashboard89: {
    marginInline: "auto",
    marginTop: "calc(var(--spacing) * 3)",
    maxWidth: "var(--container-2xl)",
    fontSize: "var(--text-lg)",
    lineHeight: "var(--tw-leading, var(--text-lg--line-height))",
    color: "var(--color-neutral-400)",
    "--tw-leading": null,
  },
  // Original utility group: mt-2 text-sm text-neutral-500
  electiveDashboard90: {
    marginTop: "calc(var(--spacing) * 2)",
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    color: "var(--color-neutral-500)",
    "--tw-leading": null,
  },
  // Original utility group: mt-5 inline-flex rounded-lg border border-white/10 bg-neutral-900 p-1
  electiveDashboard91: {
    marginTop: "calc(var(--spacing) * 5)",
    display: "inline-flex",
    borderRadius: "var(--radius)",
    borderStyle: "var(--tw-border-style)",
    borderWidth: "1px",
    borderColor: "#ffffff1a",
    backgroundColor: "var(--color-neutral-900)",
    padding: "var(--spacing)",
  },
  // Original utility group: bg-white text-neutral-950
  electiveDashboard92: {
    backgroundColor: "var(--color-white)",
    color: "var(--color-neutral-950)",
  },
  // Original utility group: text-neutral-400 hover:text-white
  electiveDashboard93: {
    color: "var(--color-neutral-400)",
  },
  // Original utility group: rounded-md px-4 py-2 text-sm font-medium transition-colors
  electiveDashboard94: {
    borderRadius: "calc(var(--radius) - 2px)",
    paddingInline: "calc(var(--spacing) * 4)",
    paddingBlock: "calc(var(--spacing) * 2)",
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
    "--tw-leading": null,
  },
  // Original utility group: mt-5 ml-2 inline-flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 transition-colors text-sm
  electiveDashboard95: {
    marginTop: "calc(var(--spacing) * 5)",
    marginLeft: "calc(var(--spacing) * 2)",
    display: "inline-flex",
    alignItems: "center",
    gap: "calc(var(--spacing) * 2)",
    borderRadius: "var(--radius)",
    borderStyle: "var(--tw-border-style)",
    borderWidth: "1px",
    borderColor: "#ffffff1a",
    backgroundColor: "var(--color-neutral-900)",
    paddingInline: "calc(var(--spacing) * 3)",
    paddingBlock: "calc(var(--spacing) * 2)",
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    color: "var(--color-neutral-400)",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
    "--tw-leading": null,
  },
  // Original utility group: h-4 w-4
  electiveDashboard96: {
    height: "calc(var(--spacing) * 4)",
    width: "calc(var(--spacing) * 4)",
  },
  // Original utility group: ml-1 px-1.5 py-0.5 bg-neutral-800 rounded text-xs font-mono text-neutral-500 flex items-center gap-0.5
  electiveDashboard97: {
    marginLeft: "var(--spacing)",
    display: "flex",
    alignItems: "center",
    gap: "calc(var(--spacing) * .5)",
    borderRadius: ".25rem",
    backgroundColor: "var(--color-neutral-800)",
    paddingInline: "calc(var(--spacing) * 1.5)",
    paddingBlock: "calc(var(--spacing) * .5)",
    fontFamily: "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-500)",
    "--tw-leading": null,
  },
  // Original utility group: h-2.5 w-2.5
  electiveDashboard98: {
    height: "calc(var(--spacing) * 2.5)",
    width: "calc(var(--spacing) * 2.5)",
  },
  // Original utility group: mt-10 grid grid-cols-2 md:grid-cols-4 gap-4
  electiveDashboard99: {
    marginTop: "calc(var(--spacing) * 10)",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "calc(var(--spacing) * 4)",
  },
  // Original utility group: sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-xl border-b border-white/5 pt-2
  electiveDashboard100: {
    position: "sticky",
    top: "0",
    zIndex: "40",
    borderBottomStyle: "var(--tw-border-style)",
    borderBottomWidth: "1px",
    borderColor: "#ffffff0d",
    backgroundColor: "#0a0a0af2",
    paddingTop: "calc(var(--spacing) * 2)",
    "--tw-backdrop-blur": "blur(var(--blur-xl))",
    backdropFilter:
      "var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, )",
  },
  // Original utility group: max-w-7xl mx-auto px-3 pb-2.5 sm:px-6 lg:px-8
  electiveDashboard101: {
    marginInline: "auto",
    maxWidth: "var(--container-7xl)",
    paddingInline: "calc(var(--spacing) * 3)",
    paddingBottom: "calc(var(--spacing) * 2.5)",
  },
  // Original utility group: flex flex-wrap gap-2
  electiveDashboard102: {
    display: "flex",
    flexWrap: "wrap",
    gap: "calc(var(--spacing) * 2)",
  },
  // Original utility group: w-full sm:flex-1 sm:min-w-[200px]
  electiveDashboard103: {
    width: "100%",
  },
  // Original utility group: h-9 bg-neutral-900/70 border-white/10 text-white placeholder:text-neutral-500
  electiveDashboard104: {
    height: "calc(var(--spacing) * 9)",
    borderColor: "#ffffff1a",
    backgroundColor: "#171717b3",
    color: "var(--color-white)",
  },
  // Original utility group: flex w-full gap-2
  electiveDashboard105: {
    display: "flex",
    width: "100%",
    gap: "calc(var(--spacing) * 2)",
  },
  // Original utility group: h-9 flex-1 bg-neutral-900/70 border-white/10 text-neutral-300 text-xs
  electiveDashboard106: {
    height: "calc(var(--spacing) * 9)",
    flex: "1",
    borderColor: "#ffffff1a",
    backgroundColor: "#171717b3",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    color: "var(--color-neutral-300)",
    "--tw-leading": null,
  },
  // Original utility group: flex gap-1.5
  electiveDashboard107: {
    display: "flex",
    gap: "calc(var(--spacing) * 1.5)",
  },
  // Original utility group: bg-white text-neutral-900
  electiveDashboard108: {
    backgroundColor: "var(--color-white)",
    color: "var(--color-neutral-900)",
  },
  // Original utility group: bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200
  electiveDashboard109: {
    backgroundColor: "var(--color-neutral-800)",
    color: "var(--color-neutral-400)",
  },
  // Original utility group: h-9 px-3 rounded-md text-xs font-medium transition-colors
  electiveDashboard110: {
    height: "calc(var(--spacing) * 9)",
    borderRadius: "calc(var(--radius) - 2px)",
    paddingInline: "calc(var(--spacing) * 3)",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
    "--tw-leading": null,
  },
  // Original utility group: max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8
  electiveDashboard111: {
    marginInline: "auto",
    maxWidth: "var(--container-7xl)",
    paddingInline: "calc(var(--spacing) * 4)",
    paddingBlock: "calc(var(--spacing) * 8)",
  },
  // Original utility group: flex items-center justify-between mb-6
  electiveDashboard112: {
    marginBottom: "calc(var(--spacing) * 6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // Original utility group: text-lg font-semibold text-white
  electiveDashboard113: {
    fontSize: "var(--text-lg)",
    lineHeight: "var(--tw-leading, var(--text-lg--line-height))",
    "--tw-font-weight": "var(--font-weight-semibold)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-white)",
    "--tw-leading": null,
  },
  // Original utility group: text-sm text-neutral-500 hover:text-neutral-300 transition-colors
  electiveDashboard114: {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    color: "var(--color-neutral-500)",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
    "--tw-leading": null,
  },
  // Original utility group: grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  electiveDashboard115: {
    display: "grid",
    gap: "calc(var(--spacing) * 4)",
  },
  // Original utility group: text-center py-16
  electiveDashboard116: {
    paddingBlock: "calc(var(--spacing) * 16)",
    textAlign: "center",
  },
  // Original utility group: mx-auto h-12 w-12 text-neutral-700
  electiveDashboard117: {
    marginInline: "auto",
    height: "calc(var(--spacing) * 12)",
    width: "calc(var(--spacing) * 12)",
    color: "var(--color-neutral-700)",
  },
  // Original utility group: mt-4 text-lg font-medium text-neutral-300
  electiveDashboard118: {
    marginTop: "calc(var(--spacing) * 4)",
    fontSize: "var(--text-lg)",
    lineHeight: "var(--tw-leading, var(--text-lg--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-neutral-300)",
    "--tw-leading": null,
  },
  // Original utility group: border-t border-white/5 py-8 text-center text-sm text-neutral-500
  electiveDashboard119: {
    borderTopStyle: "var(--tw-border-style)",
    borderTopWidth: "1px",
    borderColor: "#ffffff0d",
    paddingBlock: "calc(var(--spacing) * 8)",
    textAlign: "center",
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    color: "var(--color-neutral-500)",
    "--tw-leading": null,
  },
  // Original utility group: mt-1
  electiveDashboard120: {
    marginTop: "var(--spacing)",
  },
  // Original utility group: mt-4
  electiveDashboard121: {
    marginTop: "calc(var(--spacing) * 4)",
  },
  // Original utility group: bg-background w-full
  // Original utility group: mx-auto grid min-h-screen w-full max-w-5xl min-w-0 content-center items-start gap-8 p-4 pt-2 sm:gap-12 sm:p-6 md:grid-cols-2 md:gap-8 lg:p-12 2xl:max-w-6xl
  // Original utility group: mx-auto flex w-full max-w-lg min-w-0 flex-col gap-1 self-stretch lg:max-w-none
  // Original utility group: text-muted-foreground px-1.5 py-2 text-xs font-medium
  // Original utility group: bg-background text-foreground flex min-w-0 flex-1 flex-col items-start gap-6 border border-dashed p-4 sm:p-6 *:[div:not([class*='w-'])]:w-full
  // Original utility group: flex w-full flex-col
  // Original utility group: not-last:border-b
  // Original utility group: flex
  // Original utility group: focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground rounded-md py-4 text-left text-sm font-medium hover:underline focus-visible:ring-[3px] **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50
  // Original utility group: pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden
  // Original utility group: pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline
  // Original utility group: data-open:animate-accordion-down data-closed:animate-accordion-up text-sm overflow-hidden
  // Original utility group: pt-0 pb-4 [&_a]:hover:text-foreground h-(--radix-accordion-content-height) [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4
  // Original utility group: data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50
  // Original utility group: data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 gap-6 rounded-xl p-6 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none
  // Original utility group: grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]
  // Original utility group: flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end
  // Original utility group: bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8
  // Original utility group: text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2
  // Original utility group: text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3
  // Original utility group: h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors overflow-hidden group/badge
  badge142: {
    display: "inline-flex",
    height: "calc(var(--spacing) * 5)",
    width: "fit-content",
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--spacing)",
    overflow: "hidden",
    borderRadius: "calc(var(--radius) + 16px)",
    borderStyle: "var(--tw-border-style)",
    borderWidth: "1px",
    borderColor: "#0000",
    paddingInline: "calc(var(--spacing) * 2)",
    paddingBlock: "calc(var(--spacing) * .5)",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--tw-leading, var(--text-xs--line-height))",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
    whiteSpace: "nowrap",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
    "--tw-leading": null,
  },
  // Original utility group: bg-primary text-primary-foreground [a]:hover:bg-primary/80
  badge143: {
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
  },
  // Original utility group: bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80
  badge144: {
    backgroundColor: "var(--secondary)",
    color: "var(--secondary-foreground)",
  },
  // Original utility group: bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20
  badge145: {
    backgroundColor: "var(--destructive)",
    color: "var(--destructive)",
  },
  // Original utility group: border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground
  badge146: {
    borderColor: "var(--border)",
    color: "var(--foreground)",
  },
  // Original utility group: hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50
  badge147: {},
  // Original utility group: text-primary underline-offset-4 hover:underline
  badge148: {
    color: "var(--primary)",
    textUnderlineOffset: "4px",
  },
  // Original utility group: focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none
  // Original utility group: bg-primary text-primary-foreground hover:bg-primary/80
  // Original utility group: border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs
  // Original utility group: bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground
  // Original utility group: hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground
  // Original utility group: bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30
  // Original utility group: h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2
  // Original utility group: h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3
  // Original utility group: h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5
  // Original utility group: h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3
  // Original utility group: size-9
  // Original utility group: size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3
  // Original utility group: size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md
  // Original utility group: size-10
  // Original utility group: ring-foreground/10 bg-card text-card-foreground gap-6 overflow-hidden rounded-xl py-6 text-sm shadow-xs ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col
  card163: {
    display: "flex",
    flexDirection: "column",
    gap: "calc(var(--spacing) * 6)",
    overflow: "hidden",
    borderRadius: "calc(var(--radius) + 4px)",
    backgroundColor: "var(--card)",
    paddingBlock: "calc(var(--spacing) * 6)",
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    color: "var(--card-foreground)",
    "--tw-shadow": "0 1px 2px 0 var(--tw-shadow-color, #0000000d)",
    boxShadow:
      "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
    "--tw-ring-shadow":
      "var(--tw-ring-inset, ) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor)",
    "--tw-ring-color": "var(--foreground)",
    "--tw-leading": null,
  },
  // Original utility group: gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]
  card164: {
    container: "card-header / inline-size",
    display: "grid",
    gridAutoRows: "min-content",
    alignItems: "flex-start",
    gap: "var(--spacing)",
    borderTopLeftRadius: "calc(var(--radius) + 4px)",
    borderTopRightRadius: "calc(var(--radius) + 4px)",
    paddingInline: "calc(var(--spacing) * 6)",
  },
  // Original utility group: text-base leading-normal font-medium group-data-[size=sm]/card:text-sm
  card165: {
    fontSize: "var(--text-base)",
    lineHeight: "var(--leading-normal)",
    "--tw-leading": "var(--leading-normal)",
    "--tw-font-weight": "var(--font-weight-medium)",
    fontWeight: "var(--font-weight-medium)",
  },
  // Original utility group: text-muted-foreground text-sm
  card166: {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    color: "var(--muted-foreground)",
    "--tw-leading": null,
  },
  // Original utility group: col-start-2 row-span-2 row-start-1 self-start justify-self-end
  // Original utility group: px-6 group-data-[size=sm]/card:px-4
  card168: {
    paddingInline: "calc(var(--spacing) * 6)",
  },
  // Original utility group: rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4 flex items-center
  // Original utility group: [&_svg:not([class*='size-'])]:size-4
  // Original utility group: text-muted-foreground size-4 pointer-events-none
  combobox171: {
    pointerEvents: "none",
    width: "calc(var(--spacing) * 4)",
    height: "calc(var(--spacing) * 4)",
    color: "var(--muted-foreground)",
  },
  // Original utility group: pointer-events-none
  combobox172: {
    pointerEvents: "none",
  },
  // Original utility group: w-auto
  // Original utility group: group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent
  // Original utility group: isolate z-50
  // Original utility group: bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:border-input/30 max-h-72 min-w-36 overflow-hidden rounded-md shadow-md ring-1 duration-100 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) data-[chips=true]:min-w-(--anchor-width)
  // Original utility group: no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0 overflow-y-auto overscroll-contain
  // Original utility group: data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0
  // Original utility group: pointer-events-none absolute right-2 flex size-4 items-center justify-center
  combobox179: {
    pointerEvents: "none",
    position: "absolute",
    right: "calc(var(--spacing) * 2)",
    display: "flex",
    width: "calc(var(--spacing) * 4)",
    height: "calc(var(--spacing) * 4)",
    alignItems: "center",
    justifyContent: "center",
  },
  // Original utility group: text-muted-foreground px-2 py-1.5 text-xs
  // Original utility group: text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex
  // Original utility group: bg-border -mx-1 my-1 h-px
  // Original utility group: dark:bg-input/30 border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive dark:has-aria-invalid:border-destructive/50 flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border bg-transparent bg-clip-padding px-2.5 py-1.5 text-sm shadow-xs transition-[color,box-shadow] focus-within:ring-[3px] has-aria-invalid:ring-[3px] has-data-[slot=combobox-chip]:px-1.5
  // Original utility group: bg-muted text-foreground flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap has-data-[slot=combobox-chip-remove]:pr-0 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50
  // Original utility group: -ml-1 opacity-50 hover:opacity-100
  // Original utility group: min-w-16 flex-1 outline-none
  // Original utility group: data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-md p-1 shadow-md ring-1 duration-100 z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden
  // Original utility group: focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0
  // Original utility group: focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0
  // Original utility group: pointer-events-none absolute right-2 flex items-center justify-center pointer-events-none
  // Original utility group: text-muted-foreground px-2 py-1.5 text-xs font-medium data-[inset]:pl-8
  // Original utility group: text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest
  // Original utility group: focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0
  // Original utility group: data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-[96px] rounded-md p-1 shadow-lg ring-1 duration-100 z-50 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden
  // Original utility group: gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col
  // Original utility group: mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base
  // Original utility group: gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4 group/field-group @container/field-group flex w-full flex-col
  // Original utility group: data-[invalid=true]:text-destructive gap-3 group/field flex w-full
  // Original utility group: flex-col [&>*]:w-full [&>.sr-only]:w-auto
  // Original utility group: flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px
  // Original utility group: flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px
  // Original utility group: group
  field202: {},
  // Original utility group: gap-1 group/field-content flex flex-1 flex-col leading-snug
  // Original utility group: has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-3 group/field-label peer/field-label flex w-fit leading-snug
  // Original utility group: has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col
  // Original utility group: gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug
  // Original utility group: text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance
  // Original utility group: last:mt-0 nth-last-2:-mt-1
  // Original utility group: [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4
  // Original utility group: -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2 relative
  // Original utility group: absolute inset-0 top-1/2
  // Original utility group: text-muted-foreground px-2 bg-background relative mx-auto block w-fit
  // Original utility group: ml-4 flex list-disc flex-col gap-1
  // Original utility group: text-destructive text-sm font-normal
  // Original utility group: border-input dark:bg-input/30 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 h-9 rounded-md border shadow-xs transition-[color,box-shadow] has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot][aria-invalid=true]]:ring-[3px] has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 [[data-slot=combobox-content]_&]:focus-within:border-inherit [[data-slot=combobox-content]_&]:focus-within:ring-0 group/input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto
  // Original utility group: text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none
  // Original utility group: pl-2 has-[>button]:ml-[-0.25rem] has-[>kbd]:ml-[-0.15rem] order-first
  // Original utility group: pr-2 has-[>button]:mr-[-0.25rem] has-[>kbd]:mr-[-0.15rem] order-last
  // Original utility group: px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start
  // Original utility group: px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start
  // Original utility group: gap-2 text-sm shadow-none flex items-center
  // Original utility group: h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5
  // Original utility group: size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0
  // Original utility group: size-8 p-0 has-[>svg]:p-0
  // Original utility group: text-muted-foreground gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none
  // Original utility group: rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent flex-1
  // Original utility group: rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent flex-1 resize-none
  // Original utility group: dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
  input228: {
    height: "calc(var(--spacing) * 9)",
    width: "100%",
    minWidth: "0",
    borderRadius: "calc(var(--radius) - 2px)",
    borderStyle: "var(--tw-border-style)",
    borderWidth: "1px",
    borderColor: "var(--input)",
    backgroundColor: "#0000",
    paddingInline: "calc(var(--spacing) * 2.5)",
    paddingBlock: "var(--spacing)",
    fontSize: "var(--text-base)",
    lineHeight: "var(--tw-leading, var(--text-base--line-height))",
    "--tw-shadow": "0 1px 2px 0 var(--tw-shadow-color, #0000000d)",
    boxShadow:
      "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
    transitionProperty: "color, box-shadow",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
    "--tw-outline-style": "none",
    outlineStyle: "none",
    "--tw-leading": null,
  },
  // Original utility group: gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed
  // Original utility group: scroll-my-1 p-1
  // Original utility group: border-input data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-md border bg-transparent py-2 pr-2 pl-2.5 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0
  select231: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "calc(var(--spacing) * 1.5)",
    borderRadius: "calc(var(--radius) - 2px)",
    borderStyle: "var(--tw-border-style)",
    borderWidth: "1px",
    borderColor: "var(--input)",
    backgroundColor: "#0000",
    paddingBlock: "calc(var(--spacing) * 2)",
    paddingRight: "calc(var(--spacing) * 2)",
    paddingLeft: "calc(var(--spacing) * 2.5)",
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    whiteSpace: "nowrap",
    "--tw-shadow": "0 1px 2px 0 var(--tw-shadow-color, #0000000d)",
    boxShadow:
      "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
    transitionProperty: "color, box-shadow",
    transitionTimingFunction: "var(--tw-ease, var(--default-transition-timing-function))",
    transitionDuration: "var(--tw-duration, var(--default-transition-duration))",
    "--tw-outline-style": "none",
    outlineStyle: "none",
    "--tw-leading": null,
  },
  // Original utility group: bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-md shadow-md ring-1 duration-100 relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto
  select232: {
    position: "relative",
    zIndex: "50",
    maxHeight: "var(--radix-select-content-available-height)",
    minWidth: "calc(var(--spacing) * 36)",
    transformOrigin: "var(--radix-select-content-transform-origin)",
    overflowX: "hidden",
    overflowY: "auto",
    borderRadius: "calc(var(--radius) - 2px)",
    backgroundColor: "var(--popover)",
    color: "var(--popover-foreground)",
    "--tw-shadow":
      "0 4px 6px -1px var(--tw-shadow-color, #0000001a), 0 2px 4px -2px var(--tw-shadow-color, #0000001a)",
    boxShadow:
      "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)",
    "--tw-ring-shadow":
      "var(--tw-ring-inset, ) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor)",
    "--tw-ring-color": "var(--foreground)",
    "--tw-duration": ".1s",
    transitionDuration: ".1s",
  },
  // Original utility group: data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1
  select233: {},
  // Original utility group: data-[position=popper]:h-[var(--radix-select-trigger-height)] data-[position=popper]:w-full data-[position=popper]:min-w-[var(--radix-select-trigger-width)]
  select234: {},
  // Original utility group: focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0
  select235: {
    position: "relative",
    display: "flex",
    width: "100%",
    cursor: "default",
    alignItems: "center",
    gap: "calc(var(--spacing) * 2)",
    borderRadius: "calc(var(--radius) - 4px)",
    paddingBlock: "calc(var(--spacing) * 1.5)",
    paddingRight: "calc(var(--spacing) * 8)",
    paddingLeft: "calc(var(--spacing) * 2)",
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    "--tw-outline-style": "none",
    outlineStyle: "none",
    WebkitUserSelect: "none",
    userSelect: "none",
    "--tw-leading": null,
  },
  // Original utility group: bg-border -mx-1 my-1 h-px pointer-events-none
  // Original utility group: bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4
  select237: {
    zIndex: "10",
    display: "flex",
    cursor: "default",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--popover)",
    paddingBlock: "var(--spacing)",
  },
  // Original utility group: bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch
  // Original utility group: border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50
  // Original utility group: text-red-400
  electives240: {
    color: "var(--color-red-400)",
  },
  // Original utility group: text-orange-400
  electives241: {
    color: "var(--color-orange-400)",
  },
  // Original utility group: text-yellow-400
  electives242: {
    color: "var(--color-yellow-400)",
  },
  // Original utility group: text-green-400
  electives243: {
    color: "var(--color-green-400)",
  },
  // Original utility group: text-emerald-400
  electives244: {
    color: "var(--color-emerald-400)",
  },
});
export const classNames = {
  home0: `${stylex.props(styles.home0).className ?? ""} cutoff-home0`,
  home1: `${stylex.props(styles.home1).className ?? ""} cutoff-home1`,
  home2: `${stylex.props(styles.home2).className ?? ""} cutoff-home2`,
  home3: `${stylex.props(styles.home3).className ?? ""} cutoff-home3`,
  home4: `${stylex.props(styles.home4).className ?? ""} cutoff-home4`,
  home5: `${stylex.props(styles.home5).className ?? ""} cutoff-home5`,
  home6: `${stylex.props(styles.home6).className ?? ""} cutoff-home6`,
  home7: `${stylex.props(styles.home7).className ?? ""} cutoff-home7`,
  home8: `${stylex.props(styles.home8).className ?? ""} cutoff-home8`,
  layout9: `${stylex.props(styles.layout9).className ?? ""} cutoff-layout9`,
  layout10: `${stylex.props(styles.layout10).className ?? ""} cutoff-layout10`,
  layout11: `${stylex.props(styles.layout11).className ?? ""} cutoff-layout11`,
  layout12: `${stylex.props(styles.layout12).className ?? ""} cutoff-layout12`,
  layout13: `${stylex.props(styles.layout13).className ?? ""} cutoff-layout13`,
  layout14: `${stylex.props(styles.layout14).className ?? ""} cutoff-layout14`,
  electiveDashboard24: `${stylex.props(styles.electiveDashboard24).className ?? ""} cutoff-electiveDashboard24`,
  electiveDashboard25: `${stylex.props(styles.electiveDashboard25).className ?? ""} cutoff-electiveDashboard25`,
  electiveDashboard26: `${stylex.props(styles.electiveDashboard26).className ?? ""} cutoff-electiveDashboard26`,
  electiveDashboard27: `${stylex.props(styles.electiveDashboard27).className ?? ""} cutoff-electiveDashboard27`,
  electiveDashboard28: `${stylex.props(styles.electiveDashboard28).className ?? ""} cutoff-electiveDashboard28`,
  electiveDashboard29: `${stylex.props(styles.electiveDashboard29).className ?? ""} cutoff-electiveDashboard29`,
  electiveDashboard30: `${stylex.props(styles.electiveDashboard30).className ?? ""} cutoff-electiveDashboard30`,
  electiveDashboard31: `${stylex.props(styles.electiveDashboard31).className ?? ""} cutoff-electiveDashboard31`,
  electiveDashboard32: `${stylex.props(styles.electiveDashboard32).className ?? ""} cutoff-electiveDashboard32`,
  electiveDashboard33: `${stylex.props(styles.electiveDashboard33).className ?? ""} cutoff-electiveDashboard33`,
  electiveDashboard34: `${stylex.props(styles.electiveDashboard34).className ?? ""} cutoff-electiveDashboard34`,
  electiveDashboard35: `${stylex.props(styles.electiveDashboard35).className ?? ""} cutoff-electiveDashboard35`,
  electiveDashboard36: `${stylex.props(styles.electiveDashboard36).className ?? ""} cutoff-electiveDashboard36`,
  electiveDashboard37: `${stylex.props(styles.electiveDashboard37).className ?? ""} cutoff-electiveDashboard37`,
  electiveDashboard38: `${stylex.props(styles.electiveDashboard38).className ?? ""} cutoff-electiveDashboard38`,
  electiveDashboard39: `${stylex.props(styles.electiveDashboard39).className ?? ""} cutoff-electiveDashboard39`,
  electiveDashboard40: `${stylex.props(styles.electiveDashboard40).className ?? ""} cutoff-electiveDashboard40`,
  electiveDashboard41: `${stylex.props(styles.electiveDashboard41).className ?? ""} cutoff-electiveDashboard41`,
  electiveDashboard42: `${stylex.props(styles.electiveDashboard42).className ?? ""} cutoff-electiveDashboard42`,
  electiveDashboard43: `${stylex.props(styles.electiveDashboard43).className ?? ""} cutoff-electiveDashboard43`,
  electiveDashboard44: `${stylex.props(styles.electiveDashboard44).className ?? ""} cutoff-electiveDashboard44`,
  electiveDashboard45: `${stylex.props(styles.electiveDashboard45).className ?? ""} cutoff-electiveDashboard45`,
  electiveDashboard46: `${stylex.props(styles.electiveDashboard46).className ?? ""} cutoff-electiveDashboard46`,
  electiveDashboard47: `${stylex.props(styles.electiveDashboard47).className ?? ""} cutoff-electiveDashboard47`,
  electiveDashboard48: `${stylex.props(styles.electiveDashboard48).className ?? ""} cutoff-electiveDashboard48`,
  electiveDashboard49: `${stylex.props(styles.electiveDashboard49).className ?? ""} cutoff-electiveDashboard49`,
  electiveDashboard50: `${stylex.props(styles.electiveDashboard50).className ?? ""} cutoff-electiveDashboard50`,
  electiveDashboard51: `${stylex.props(styles.electiveDashboard51).className ?? ""} cutoff-electiveDashboard51`,
  electiveDashboard52: `${stylex.props(styles.electiveDashboard52).className ?? ""} cutoff-electiveDashboard52`,
  electiveDashboard53: `${stylex.props(styles.electiveDashboard53).className ?? ""} cutoff-electiveDashboard53`,
  electiveDashboard54: `${stylex.props(styles.electiveDashboard54).className ?? ""} cutoff-electiveDashboard54`,
  electiveDashboard55: `${stylex.props(styles.electiveDashboard55).className ?? ""} cutoff-electiveDashboard55`,
  electiveDashboard56: `${stylex.props(styles.electiveDashboard56).className ?? ""} cutoff-electiveDashboard56`,
  electiveDashboard57: `${stylex.props(styles.electiveDashboard57).className ?? ""} cutoff-electiveDashboard57`,
  electiveDashboard58: `${stylex.props(styles.electiveDashboard58).className ?? ""} cutoff-electiveDashboard58`,
  electiveDashboard59: `${stylex.props(styles.electiveDashboard59).className ?? ""} cutoff-electiveDashboard59`,
  electiveDashboard60: `${stylex.props(styles.electiveDashboard60).className ?? ""} cutoff-electiveDashboard60 group`,
  electiveDashboard61: `${stylex.props(styles.electiveDashboard61).className ?? ""} cutoff-electiveDashboard61`,
  electiveDashboard62: `${stylex.props(styles.electiveDashboard62).className ?? ""} cutoff-electiveDashboard62`,
  electiveDashboard63: `${stylex.props(styles.electiveDashboard63).className ?? ""} cutoff-electiveDashboard63`,
  electiveDashboard64: `${stylex.props(styles.electiveDashboard64).className ?? ""} cutoff-electiveDashboard64`,
  electiveDashboard65: `${stylex.props(styles.electiveDashboard65).className ?? ""} cutoff-electiveDashboard65`,
  electiveDashboard66: `${stylex.props(styles.electiveDashboard66).className ?? ""} cutoff-electiveDashboard66`,
  electiveDashboard67: `${stylex.props(styles.electiveDashboard67).className ?? ""} cutoff-electiveDashboard67`,
  electiveDashboard68: `${stylex.props(styles.electiveDashboard68).className ?? ""} cutoff-electiveDashboard68`,
  electiveDashboard69: `${stylex.props(styles.electiveDashboard69).className ?? ""} cutoff-electiveDashboard69`,
  electiveDashboard70: `${stylex.props(styles.electiveDashboard70).className ?? ""} cutoff-electiveDashboard70`,
  electiveDashboard71: `${stylex.props(styles.electiveDashboard71).className ?? ""} cutoff-electiveDashboard71`,
  electiveDashboard72: `${stylex.props(styles.electiveDashboard72).className ?? ""} cutoff-electiveDashboard72`,
  electiveDashboard73: `${stylex.props(styles.electiveDashboard73).className ?? ""} cutoff-electiveDashboard73`,
  electiveDashboard74: `${stylex.props(styles.electiveDashboard74).className ?? ""} cutoff-electiveDashboard74`,
  electiveDashboard75: `${stylex.props(styles.electiveDashboard75).className ?? ""} cutoff-electiveDashboard75`,
  electiveDashboard76: `${stylex.props(styles.electiveDashboard76).className ?? ""} cutoff-electiveDashboard76`,
  electiveDashboard77: `${stylex.props(styles.electiveDashboard77).className ?? ""} cutoff-electiveDashboard77`,
  electiveDashboard78: `${stylex.props(styles.electiveDashboard78).className ?? ""} cutoff-electiveDashboard78`,
  electiveDashboard79: `${stylex.props(styles.electiveDashboard79).className ?? ""} cutoff-electiveDashboard79`,
  electiveDashboard80: `${stylex.props(styles.electiveDashboard80).className ?? ""} cutoff-electiveDashboard80`,
  electiveDashboard81: `${stylex.props(styles.electiveDashboard81).className ?? ""} cutoff-electiveDashboard81`,
  electiveDashboard82: `${stylex.props(styles.electiveDashboard82).className ?? ""} cutoff-electiveDashboard82`,
  electiveDashboard83: `${stylex.props(styles.electiveDashboard83).className ?? ""} cutoff-electiveDashboard83`,
  electiveDashboard84: `${stylex.props(styles.electiveDashboard84).className ?? ""} cutoff-electiveDashboard84`,
  electiveDashboard85: `${stylex.props(styles.electiveDashboard85).className ?? ""} cutoff-electiveDashboard85`,
  electiveDashboard86: `${stylex.props(styles.electiveDashboard86).className ?? ""} cutoff-electiveDashboard86`,
  electiveDashboard87: `${stylex.props(styles.electiveDashboard87).className ?? ""} cutoff-electiveDashboard87`,
  electiveDashboard88: `${stylex.props(styles.electiveDashboard88).className ?? ""} cutoff-electiveDashboard88`,
  electiveDashboard89: `${stylex.props(styles.electiveDashboard89).className ?? ""} cutoff-electiveDashboard89`,
  electiveDashboard90: `${stylex.props(styles.electiveDashboard90).className ?? ""} cutoff-electiveDashboard90`,
  electiveDashboard91: `${stylex.props(styles.electiveDashboard91).className ?? ""} cutoff-electiveDashboard91`,
  electiveDashboard92: `${stylex.props(styles.electiveDashboard92).className ?? ""} cutoff-electiveDashboard92`,
  electiveDashboard93: `${stylex.props(styles.electiveDashboard93).className ?? ""} cutoff-electiveDashboard93`,
  electiveDashboard94: `${stylex.props(styles.electiveDashboard94).className ?? ""} cutoff-electiveDashboard94`,
  electiveDashboard95: `${stylex.props(styles.electiveDashboard95).className ?? ""} cutoff-electiveDashboard95`,
  electiveDashboard96: `${stylex.props(styles.electiveDashboard96).className ?? ""} cutoff-electiveDashboard96`,
  electiveDashboard97: `${stylex.props(styles.electiveDashboard97).className ?? ""} cutoff-electiveDashboard97`,
  electiveDashboard98: `${stylex.props(styles.electiveDashboard98).className ?? ""} cutoff-electiveDashboard98`,
  electiveDashboard99: `${stylex.props(styles.electiveDashboard99).className ?? ""} cutoff-electiveDashboard99`,
  electiveDashboard100: `${stylex.props(styles.electiveDashboard100).className ?? ""} cutoff-electiveDashboard100`,
  electiveDashboard101: `${stylex.props(styles.electiveDashboard101).className ?? ""} cutoff-electiveDashboard101`,
  electiveDashboard102: `${stylex.props(styles.electiveDashboard102).className ?? ""} cutoff-electiveDashboard102`,
  electiveDashboard103: `${stylex.props(styles.electiveDashboard103).className ?? ""} cutoff-electiveDashboard103`,
  electiveDashboard104: `${stylex.props(styles.electiveDashboard104).className ?? ""} cutoff-electiveDashboard104`,
  electiveDashboard105: `${stylex.props(styles.electiveDashboard105).className ?? ""} cutoff-electiveDashboard105`,
  electiveDashboard106: `${stylex.props(styles.electiveDashboard106).className ?? ""} cutoff-electiveDashboard106`,
  electiveDashboard107: `${stylex.props(styles.electiveDashboard107).className ?? ""} cutoff-electiveDashboard107`,
  electiveDashboard108: `${stylex.props(styles.electiveDashboard108).className ?? ""} cutoff-electiveDashboard108`,
  electiveDashboard109: `${stylex.props(styles.electiveDashboard109).className ?? ""} cutoff-electiveDashboard109`,
  electiveDashboard110: `${stylex.props(styles.electiveDashboard110).className ?? ""} cutoff-electiveDashboard110`,
  electiveDashboard111: `${stylex.props(styles.electiveDashboard111).className ?? ""} cutoff-electiveDashboard111`,
  electiveDashboard112: `${stylex.props(styles.electiveDashboard112).className ?? ""} cutoff-electiveDashboard112`,
  electiveDashboard113: `${stylex.props(styles.electiveDashboard113).className ?? ""} cutoff-electiveDashboard113`,
  electiveDashboard114: `${stylex.props(styles.electiveDashboard114).className ?? ""} cutoff-electiveDashboard114`,
  electiveDashboard115: `${stylex.props(styles.electiveDashboard115).className ?? ""} cutoff-electiveDashboard115`,
  electiveDashboard116: `${stylex.props(styles.electiveDashboard116).className ?? ""} cutoff-electiveDashboard116`,
  electiveDashboard117: `${stylex.props(styles.electiveDashboard117).className ?? ""} cutoff-electiveDashboard117`,
  electiveDashboard118: `${stylex.props(styles.electiveDashboard118).className ?? ""} cutoff-electiveDashboard118`,
  electiveDashboard119: `${stylex.props(styles.electiveDashboard119).className ?? ""} cutoff-electiveDashboard119`,
  electiveDashboard120: `${stylex.props(styles.electiveDashboard120).className ?? ""} cutoff-electiveDashboard120`,
  electiveDashboard121: `${stylex.props(styles.electiveDashboard121).className ?? ""} cutoff-electiveDashboard121`,
  badge142: `${stylex.props(styles.badge142).className ?? ""} cutoff-badge142 group/badge`,
  badge143: `${stylex.props(styles.badge143).className ?? ""} cutoff-badge143`,
  badge144: `${stylex.props(styles.badge144).className ?? ""} cutoff-badge144`,
  badge145: `${stylex.props(styles.badge145).className ?? ""} cutoff-badge145`,
  badge146: `${stylex.props(styles.badge146).className ?? ""} cutoff-badge146`,
  badge147: `${stylex.props(styles.badge147).className ?? ""} cutoff-badge147`,
  badge148: `${stylex.props(styles.badge148).className ?? ""} cutoff-badge148`,
  card163: `${stylex.props(styles.card163).className ?? ""} cutoff-card163 group/card`,
  card164: `${stylex.props(styles.card164).className ?? ""} cutoff-card164 group/card-header`,
  card165: `${stylex.props(styles.card165).className ?? ""} cutoff-card165`,
  card166: `${stylex.props(styles.card166).className ?? ""} cutoff-card166`,
  card168: `${stylex.props(styles.card168).className ?? ""} cutoff-card168`,
  combobox171: `${stylex.props(styles.combobox171).className ?? ""} cutoff-combobox171`,
  combobox172: `${stylex.props(styles.combobox172).className ?? ""} cutoff-combobox172`,
  combobox179: `${stylex.props(styles.combobox179).className ?? ""} cutoff-combobox179`,
  field202: `${stylex.props(styles.field202).className ?? ""} cutoff-field202 group`,
  input228: `${stylex.props(styles.input228).className ?? ""} cutoff-input228`,
  select231: `${stylex.props(styles.select231).className ?? ""} cutoff-select231`,
  select232: `${stylex.props(styles.select232).className ?? ""} cutoff-select232`,
  select233: `${stylex.props(styles.select233).className ?? ""} cutoff-select233`,
  select234: `${stylex.props(styles.select234).className ?? ""} cutoff-select234`,
  select235: `${stylex.props(styles.select235).className ?? ""} cutoff-select235`,
  select237: `${stylex.props(styles.select237).className ?? ""} cutoff-select237`,
  electives240: `${stylex.props(styles.electives240).className ?? ""} cutoff-electives240`,
  electives241: `${stylex.props(styles.electives241).className ?? ""} cutoff-electives241`,
  electives242: `${stylex.props(styles.electives242).className ?? ""} cutoff-electives242`,
  electives243: `${stylex.props(styles.electives243).className ?? ""} cutoff-electives243`,
  electives244: `${stylex.props(styles.electives244).className ?? ""} cutoff-electives244`,
};

/** @type {Array<[string, import("@stylexjs/stylex").StyleXStyles]>} */
export const styleEntries = [
  ["cutoff-home0", styles.home0],
  ["cutoff-home1", styles.home1],
  ["cutoff-home2", styles.home2],
  ["cutoff-home3", styles.home3],
  ["cutoff-home4", styles.home4],
  ["cutoff-home5", styles.home5],
  ["cutoff-home6", styles.home6],
  ["cutoff-home7", styles.home7],
  ["cutoff-home8", styles.home8],
  ["cutoff-layout9", styles.layout9],
  ["cutoff-layout10", styles.layout10],
  ["cutoff-layout11", styles.layout11],
  ["cutoff-layout12", styles.layout12],
  ["cutoff-layout13", styles.layout13],
  ["cutoff-layout14", styles.layout14],
  ["cutoff-electiveDashboard24", styles.electiveDashboard24],
  ["cutoff-electiveDashboard25", styles.electiveDashboard25],
  ["cutoff-electiveDashboard26", styles.electiveDashboard26],
  ["cutoff-electiveDashboard27", styles.electiveDashboard27],
  ["cutoff-electiveDashboard28", styles.electiveDashboard28],
  ["cutoff-electiveDashboard29", styles.electiveDashboard29],
  ["cutoff-electiveDashboard30", styles.electiveDashboard30],
  ["cutoff-electiveDashboard31", styles.electiveDashboard31],
  ["cutoff-electiveDashboard32", styles.electiveDashboard32],
  ["cutoff-electiveDashboard33", styles.electiveDashboard33],
  ["cutoff-electiveDashboard34", styles.electiveDashboard34],
  ["cutoff-electiveDashboard35", styles.electiveDashboard35],
  ["cutoff-electiveDashboard36", styles.electiveDashboard36],
  ["cutoff-electiveDashboard37", styles.electiveDashboard37],
  ["cutoff-electiveDashboard38", styles.electiveDashboard38],
  ["cutoff-electiveDashboard39", styles.electiveDashboard39],
  ["cutoff-electiveDashboard40", styles.electiveDashboard40],
  ["cutoff-electiveDashboard41", styles.electiveDashboard41],
  ["cutoff-electiveDashboard42", styles.electiveDashboard42],
  ["cutoff-electiveDashboard43", styles.electiveDashboard43],
  ["cutoff-electiveDashboard44", styles.electiveDashboard44],
  ["cutoff-electiveDashboard45", styles.electiveDashboard45],
  ["cutoff-electiveDashboard46", styles.electiveDashboard46],
  ["cutoff-electiveDashboard47", styles.electiveDashboard47],
  ["cutoff-electiveDashboard48", styles.electiveDashboard48],
  ["cutoff-electiveDashboard49", styles.electiveDashboard49],
  ["cutoff-electiveDashboard50", styles.electiveDashboard50],
  ["cutoff-electiveDashboard51", styles.electiveDashboard51],
  ["cutoff-electiveDashboard52", styles.electiveDashboard52],
  ["cutoff-electiveDashboard53", styles.electiveDashboard53],
  ["cutoff-electiveDashboard54", styles.electiveDashboard54],
  ["cutoff-electiveDashboard55", styles.electiveDashboard55],
  ["cutoff-electiveDashboard56", styles.electiveDashboard56],
  ["cutoff-electiveDashboard57", styles.electiveDashboard57],
  ["cutoff-electiveDashboard58", styles.electiveDashboard58],
  ["cutoff-electiveDashboard59", styles.electiveDashboard59],
  ["cutoff-electiveDashboard60", styles.electiveDashboard60],
  ["cutoff-electiveDashboard61", styles.electiveDashboard61],
  ["cutoff-electiveDashboard62", styles.electiveDashboard62],
  ["cutoff-electiveDashboard63", styles.electiveDashboard63],
  ["cutoff-electiveDashboard64", styles.electiveDashboard64],
  ["cutoff-electiveDashboard65", styles.electiveDashboard65],
  ["cutoff-electiveDashboard66", styles.electiveDashboard66],
  ["cutoff-electiveDashboard67", styles.electiveDashboard67],
  ["cutoff-electiveDashboard68", styles.electiveDashboard68],
  ["cutoff-electiveDashboard69", styles.electiveDashboard69],
  ["cutoff-electiveDashboard70", styles.electiveDashboard70],
  ["cutoff-electiveDashboard71", styles.electiveDashboard71],
  ["cutoff-electiveDashboard72", styles.electiveDashboard72],
  ["cutoff-electiveDashboard73", styles.electiveDashboard73],
  ["cutoff-electiveDashboard74", styles.electiveDashboard74],
  ["cutoff-electiveDashboard75", styles.electiveDashboard75],
  ["cutoff-electiveDashboard76", styles.electiveDashboard76],
  ["cutoff-electiveDashboard77", styles.electiveDashboard77],
  ["cutoff-electiveDashboard78", styles.electiveDashboard78],
  ["cutoff-electiveDashboard79", styles.electiveDashboard79],
  ["cutoff-electiveDashboard80", styles.electiveDashboard80],
  ["cutoff-electiveDashboard81", styles.electiveDashboard81],
  ["cutoff-electiveDashboard82", styles.electiveDashboard82],
  ["cutoff-electiveDashboard83", styles.electiveDashboard83],
  ["cutoff-electiveDashboard84", styles.electiveDashboard84],
  ["cutoff-electiveDashboard85", styles.electiveDashboard85],
  ["cutoff-electiveDashboard86", styles.electiveDashboard86],
  ["cutoff-electiveDashboard87", styles.electiveDashboard87],
  ["cutoff-electiveDashboard88", styles.electiveDashboard88],
  ["cutoff-electiveDashboard89", styles.electiveDashboard89],
  ["cutoff-electiveDashboard90", styles.electiveDashboard90],
  ["cutoff-electiveDashboard91", styles.electiveDashboard91],
  ["cutoff-electiveDashboard92", styles.electiveDashboard92],
  ["cutoff-electiveDashboard93", styles.electiveDashboard93],
  ["cutoff-electiveDashboard94", styles.electiveDashboard94],
  ["cutoff-electiveDashboard95", styles.electiveDashboard95],
  ["cutoff-electiveDashboard96", styles.electiveDashboard96],
  ["cutoff-electiveDashboard97", styles.electiveDashboard97],
  ["cutoff-electiveDashboard98", styles.electiveDashboard98],
  ["cutoff-electiveDashboard99", styles.electiveDashboard99],
  ["cutoff-electiveDashboard100", styles.electiveDashboard100],
  ["cutoff-electiveDashboard101", styles.electiveDashboard101],
  ["cutoff-electiveDashboard102", styles.electiveDashboard102],
  ["cutoff-electiveDashboard103", styles.electiveDashboard103],
  ["cutoff-electiveDashboard104", styles.electiveDashboard104],
  ["cutoff-electiveDashboard105", styles.electiveDashboard105],
  ["cutoff-electiveDashboard106", styles.electiveDashboard106],
  ["cutoff-electiveDashboard107", styles.electiveDashboard107],
  ["cutoff-electiveDashboard108", styles.electiveDashboard108],
  ["cutoff-electiveDashboard109", styles.electiveDashboard109],
  ["cutoff-electiveDashboard110", styles.electiveDashboard110],
  ["cutoff-electiveDashboard111", styles.electiveDashboard111],
  ["cutoff-electiveDashboard112", styles.electiveDashboard112],
  ["cutoff-electiveDashboard113", styles.electiveDashboard113],
  ["cutoff-electiveDashboard114", styles.electiveDashboard114],
  ["cutoff-electiveDashboard115", styles.electiveDashboard115],
  ["cutoff-electiveDashboard116", styles.electiveDashboard116],
  ["cutoff-electiveDashboard117", styles.electiveDashboard117],
  ["cutoff-electiveDashboard118", styles.electiveDashboard118],
  ["cutoff-electiveDashboard119", styles.electiveDashboard119],
  ["cutoff-electiveDashboard120", styles.electiveDashboard120],
  ["cutoff-electiveDashboard121", styles.electiveDashboard121],
  ["cutoff-badge142", styles.badge142],
  ["cutoff-badge143", styles.badge143],
  ["cutoff-badge144", styles.badge144],
  ["cutoff-badge145", styles.badge145],
  ["cutoff-badge146", styles.badge146],
  ["cutoff-badge147", styles.badge147],
  ["cutoff-badge148", styles.badge148],
  ["cutoff-card163", styles.card163],
  ["cutoff-card164", styles.card164],
  ["cutoff-card165", styles.card165],
  ["cutoff-card166", styles.card166],
  ["cutoff-card168", styles.card168],
  ["cutoff-combobox171", styles.combobox171],
  ["cutoff-combobox172", styles.combobox172],
  ["cutoff-combobox179", styles.combobox179],
  ["cutoff-field202", styles.field202],
  ["cutoff-input228", styles.input228],
  ["cutoff-select231", styles.select231],
  ["cutoff-select232", styles.select232],
  ["cutoff-select233", styles.select233],
  ["cutoff-select234", styles.select234],
  ["cutoff-select235", styles.select235],
  ["cutoff-select237", styles.select237],
  ["cutoff-electives240", styles.electives240],
  ["cutoff-electives241", styles.electives241],
  ["cutoff-electives242", styles.electives242],
  ["cutoff-electives243", styles.electives243],
  ["cutoff-electives244", styles.electives244],
];

/** @type {Record<string, string>} */
export const difficultyClassNames = {
  "text-red-400": classNames.electives240,
  "text-orange-400": classNames.electives241,
  "text-yellow-400": classNames.electives242,
  "text-green-400": classNames.electives243,
  "text-emerald-400": classNames.electives244,
};
