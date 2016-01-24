"use strict";

var webpack = require("webpack");
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {

  devServer: {
    contentBase: "./demo",
    noInfo: false
  },

  output: {
    path: "./demo",
    filename: "main-[hash].js",
    publicPath: "http://localhost:3000/assets/"
  },

  cache: true,
  devtool: "source-map",
  entry: {
    app: ["./demo/app.js"]
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
        loader: 'style!css!sass?sourceMap'
      }, {
        test: /\.(png|jpg)$/,
        loader: require.resolve("url-loader") + "?limit=8192"
      }
    ]
  },
  plugins: [
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
