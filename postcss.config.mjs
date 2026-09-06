import stylexOptions from "./stylex.config.cjs";
const config = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: ["ui.stylex.js"],
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [["@stylexjs/babel-plugin", stylexOptions]],
      },
      useCSSLayers: true,
    },
  },
};
export default config;
