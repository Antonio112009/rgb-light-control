const path = require("path");

module.exports = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    filename: "rgb-light-controller.js",
    path: path.resolve(__dirname, "../dist"),
  },
};
