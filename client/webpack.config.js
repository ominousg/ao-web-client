/**
 * Migración de RequireJS a Webpack por ominousg - 04/02/2023.
*/

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssLoader = require("css-loader");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const folders = ['imagenes', 'graficos', 'audio', 'css', 'js/lib', 'mapas', 'fonts', 'indices', 'audio'];

module.exports = {
  mode: 'development',
  entry: ['./js/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true
  },
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'js/lib/jquery.js'),
      'jquery-ui': path.resolve(__dirname, 'js/lib/jquery-ui.js'),
      bootstrap: path.resolve(__dirname, 'js/lib/bootstrap.js')
    }
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.html$/,
        use: 'text-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: false,
      scripts: [
        {
          src: './js/lib/jquery.js',
        },
        {
          src: './js/lib/jquery-ui.js',
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    new CopyWebpackPlugin({
      patterns: folders.map(folder => ({ from: folder, to: folder }))
    })
  ]
};