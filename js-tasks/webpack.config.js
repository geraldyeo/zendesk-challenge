var objectAssign = require('object-assign');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var webpackConfig = {};

webpackConfig.entry = {
	'main': './js-tasks/index.js',
};

webpackConfig.plugins = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			unused: true,
			dead_code: true, // eslint-disable-line
			warnings: false
		}
	})
];

module.exports = objectAssign(webpackConfig, {
	target: 'web',
	devtool: 'sourcemap',
	resolve: {
		root: __dirname,
		extensions: ['', '.js', '.json'],
		modulesDirectories: [
			__dirname,
			'node_modules'
		]
	},
	output: {
		path: __dirname,
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					compact: false,
					presets: ['es2015']
				}
			},
			{test: /\.json$/, loader: 'json'}
		]
	}
});
