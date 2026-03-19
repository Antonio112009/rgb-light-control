const path = require("path");

module.exports = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    filename: "light-entity-card.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [/node_modules(?:\/|\\)(?:lit-element|lit-html|lit|@lit(?:\/|\\)|@lit-labs(?:\/|\\))/],
        use: {
          loader: "babel-loader",
          options: {
            configFile: false, // ignore project babel.config.js for node_modules
            presets: [
              ["@babel/preset-env", { modules: false, targets: { esmodules: true } }],
            ],
          },
        },
      },
    ],
  },
};
