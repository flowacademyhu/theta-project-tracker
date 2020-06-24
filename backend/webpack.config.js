const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const envs = {};
if (process.env.NODE_ENV) {
  envs['process.env.NODE_ENV'] = '"' + process.env.NODE_ENV + '"';
}

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin(envs)
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  }
};
