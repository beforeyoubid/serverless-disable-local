/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./config.base.js');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(base, {
  entry: slsw.lib.entries,
  devtool: 'source-map',
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
});
