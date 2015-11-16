"use strict";
var path = require("path");
var webpack = require("webpack");
var config = require("./webpack.config");

// Replace with `__dirname` if using in project root.
var ROOT = process.cwd();
var req = require.context(path.join(ROOT, "src/pages"), false, /^\.\/.*\.js$/);

config.entry = req.keys().map(function(k) {
	return path.join(ROOT, "src/pages", k); 
});
// Export mutated base.
module.exports = config;
