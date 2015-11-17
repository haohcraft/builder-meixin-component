"use strict";
var path = require("path");
var webpack = require("webpack");
var config = require("./webpack.config");
var readDir = require('readdir');
var _ = require('lodash');

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
config.plugins.push(new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.js"));
// Export mutated base.
module.exports = config;
