var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		main:"./public/components/main.jsx",
		dashboard:"./public/components/dashboard.jsx"
	},
	output:{
		path: path.join(__dirname, "./public"),
        filename: "[name].entry.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader:'babel-loader',
				query: {
		          presets: ['es2015', 'react']
		        }
			}
		],
	},
	resolve: {
	    // Allow require('./blah') to require blah.jsx
	    extensions: ['', '.js', '.jsx']
	},
}