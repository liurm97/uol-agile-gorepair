const path = require("path");

module.exports = {
  mode: "development",
  entry: "./backend/src/app.js",
  output: {
    path: path.resolve(__dirname, "backend", "dist"),
    filename: "bundle.js",
  },
  watch: true,
};
