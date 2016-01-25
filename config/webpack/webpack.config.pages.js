"use strict";
var path = require("path");
var webpack = require("webpack");
var config = require("./webpack.config");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var readDir = require('readdir');
var _ = require('lodash');
var BundleTracker = require('webpack-bundle-tracker');

// Replace with `__dirname` if using in project root.
var ROOT = process.cwd();
var req = readDir.readSync(path.join(ROOT, "src/pages"), ['*.js']);
config.entry = _.reduce(req, function(result, n) {
    var reg = n.match(/(\S+).js/i);
    if(reg && reg.length) {
        result[reg[1]] = path.join(ROOT, "src/pages", n);
    }
    return result;
}, {});
config.entry.vendor = ['react', 'react-dom', 'lodash', 'moment'];
config.output.path = path.join(ROOT, "dist/pages/");
config.module.loaders = [
    {
        test: /\.js?$/,
        exclude: [/node_modules/],
        // **Note**: Cannot use shorthand `"babel-loader"` or `"babel"` when
        // we are playing around with `NODE_PATH` in builder. Manually
        // resolve path.
        loader: require.resolve("babel-loader")
    },  { 
        test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass') 
    }, {
        test: /\.(png|jpg)$/,
        loader: require.resolve("url-loader") + "?limit=8192"
    }, {
        test: /\.json$/,
        loader: require.resolve("json-loader")
    }

];
config.plugins.push(new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor-[hash].js"));
config.plugins.push(new ExtractTextPlugin('[name]-[hash].min.css', {
    disable: false,
    allChunks: true
}));
config.plugins.push(new BundleTracker({filename: './meixin-components-webpack-stats.json'}));
// Export mutated base.
module.exports = config;
