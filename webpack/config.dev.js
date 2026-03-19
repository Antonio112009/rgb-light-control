const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./config.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../src/dev'),
    },
    port: 8080,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../dev/index.html'),
      inject: 'body',
    }),
  ],
});
