const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./config.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: false,
  output: {
    publicPath: '/local/',
    clean: true,
  },
  optimization: {
    minimize: true,
    usedExports: true,
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // no .LICENSE.txt file
      }),
    ],
  },
});
