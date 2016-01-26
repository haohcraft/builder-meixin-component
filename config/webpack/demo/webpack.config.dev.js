"use strict";

var webpack = require("webpack");
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  devServer: {
    contentBase: "./demo",
    noInfo: false
  },

  output: {
    path: "./demo",
    filename: "[name].js",
    publicPath: "http://localhost:3000/assets/"
  },

  cache: true,
  devtool: "source-map",
  entry: {
    'vendor': ['react', 'react-dom', 'lodash', 'moment'],
    'home-topics': ["./src/pages/home-topics.js"],
    'home': ["./src/pages/home.js"],
    'markets': ["./src/pages/markets.js"]，
    'home-market': ["./src/pages/home-market.js"]
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ["", ".js", ".scss", ".json"],
    modulesDirectories: ['node_modules', 'src']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        // **Note**: Cannot use shorthand `"babel-loader"` or `"babel"` when
        // we are playing around with `NODE_PATH` in builder. Manually
        // resolve path.
        loader: require.resolve("babel-loader")
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      }, {
        test: /\.(png|jpg)$/,
        loader: require.resolve("url-loader") + "?limit=8192"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
        _DEVELOPMENT_: true,
        'process.env': {
            NODE_ENV: JSON.stringify("dev")
        }
    }),
    new BundleTracker({filename: './meixin-components-webpack-stats-dev.json'}),
    new webpack.NoErrorsPlugin()
  ]
};
