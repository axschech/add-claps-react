var webpack = require('webpack'),
    path = require('path'),
    BUILD_DIR = path.resolve(__dirname, 'dist'),
    APP_DIR = path.resolve(__dirname, 'src'),
    config = {
      entry: APP_DIR + '/app.jsx',
      output: {
        path: BUILD_DIR,
        filename: 'app.min.js'
      }
    };

module.exports = config;
