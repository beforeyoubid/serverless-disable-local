/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./config.base.js');
const slsw = require('serverless-webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(base, {
  mode: 'development',
  entry: slsw.lib.entries,
  plugins: [new FriendlyErrorsWebpackPlugin()],
});
