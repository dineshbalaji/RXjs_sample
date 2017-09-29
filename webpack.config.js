var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var _root = path.resolve(__dirname, '.');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
module.exports = {
  
  entry: {
    'app': './src/rxjs.js'
  },
  
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  output: {
    path: root('dist'),
    publicPath: 'http://localhost:8081/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },
  
  
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html'
      },
    ]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new HtmlWebpackPlugin({
      template: 'index.html'
    })


  ],
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
};