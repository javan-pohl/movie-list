const path = require('path')
// const CompressionPlugin = require("compression-webpack-plugin");
var BrotliPlugin = require('brotli-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'client', 'components')
const OUT_DIR = path.join(__dirname, 'public')
// const OUT_DIR = path.join(__dirname, 'proxy');

module.exports = {
  entry: path.join(SRC_DIR, 'index.jsx'),
  output: {
    path: OUT_DIR,
    filename: '[name].jsx',
    chunkFilename: '[name].jsx'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  mode: 'development',
  // mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // plugins: [new CompressionPlugin()]
  plugins: [
    // ...
    new BrotliPlugin({
      asset: '[file].br',
      test: /\.(js|jsx)$/
    })
  ]
}
