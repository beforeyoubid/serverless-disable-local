/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./config.base.js');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(base, {
  entry: {},
  devtool: 'source-map',
  externals: [nodeExternals()],
});
