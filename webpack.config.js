const path = require('path');

module.exports = {
  entry: {
    index: './src/app.jsx'
  },
  output: {
    publicPath: '/dist/',
    path: path.resolve('dist'),
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    index: './index.html',
    port: 9000,
    contentBase: path.join('./')
  }
}