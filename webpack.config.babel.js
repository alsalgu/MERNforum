const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/client',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8080/dist',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
    loaders: [
       { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  devServer: {
    port: 8080,
  }
};
