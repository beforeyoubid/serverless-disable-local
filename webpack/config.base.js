/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// CALL_AND_RETRY_LAST: @see https://github.com/serverless-heaven/serverless-webpack/issues/299

module.exports = {
  entry: {},
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
  target: 'node',
  node: {
    __dirname: true,
  },
  externals: [nodeExternals()],
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  performance: {
    // Turn off size warnings for entry points
    hints: 'warning',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                },
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new CopyWebpackPlugin({ patterns: ['secrets.json'] })],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    symlinks: true,
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, './../.build'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate: '../../[resource-path]',
  },
};
