const path = require('path');
const OUTPATH = path.join(__dirname, './example');

const config = {
  context: __dirname,
  entry: {
    // app: './src/jquery-modal-layer.js',
    example: './example/app.js'
  },
  output: {
    path: OUTPATH,
    filename: '[name].js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  }
};

module.exports = config;
