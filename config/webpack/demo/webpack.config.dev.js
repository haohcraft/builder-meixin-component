"use strict";

var webpack = require("webpack");
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var _ = require('lodash');
var path = require("path");
var readDir = require('readdir');
// Replace with `__dirname` if using in project root.
var ROOT = process.cwd();
var req = readDir.readSync(path.join(ROOT, "src/pages"), ['*.js']);
var config;

config = {

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

// each js file in src/pages/ is an entry file
config.entry = _.reduce(req, function (result, n) {
  var reg = n.match(/(\S+).js/i);
  if (reg && reg.length) {
    result[reg[1]] = path.join(ROOT, "src/pages", n);
  }
  return result;
}, {});

// include 3rd party libs into vendor
config.entry.vendor = ['react', 'react-dom', 'lodash', 'moment'];

module.exports = config;
