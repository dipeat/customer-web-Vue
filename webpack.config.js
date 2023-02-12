const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    public: 'dipeat.com',
    host: '0.0.0.0',
    port: 8080
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};