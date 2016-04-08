'use strict';


// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var react = require('gulp-react');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var order = require("gulp-order");
var webpack = require('webpack-stream');
var path = require('path');
var browserify = require('gulp-browserify');

var config = {
	js:[
		{
			files:[
			"./public/components/createorjoin.jsx",
			"./public/components/login-form.jsx",
			"./public/components/main.jsx"
			],
			outputFile:'all.js'
		},
		{
			files:[
			"./public/components/videoplayur.jsx",
			"./public/components/dashboard.jsx"
			],
			outputFile:'dashboard.js'
		}
	]
};

// Task
gulp.task('server', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: './app.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('./app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	})
});

gulp.task('webpack', function() {
	webpack({
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
	});
});

gulp.task('compile-jsx', function() {
	try {
		for (var i = 0; i < config.js.length; i++) {
			console.log(i);
			gulp.src(config.js[i].files)
			.pipe(plumber({
		        handleError: function (err) {
		            console.log(err);
		            this.emit('end');
		        }
		    }))
		    .pipe(concat(config.js[i].outputFile))
		    .pipe(react())
		    .pipe(browserify({
			  insertGlobals : true
			}))
			.pipe(gulp.dest('public'));
		}
	} catch (ex) { }
	return;
});

gulp.task('compile-stylus', function() {
	try {
		console.log('Compiling stylus...');
		return gulp.src('./public/css/**/*.styl')
			.pipe(plumber({
				handleError: function(err) {
					console.log(err);
					this.emit('end');
				}
			}))
			.pipe(stylus())
			.pipe(gulp.dest('./public/css'));
	} catch (ex) {}
	return;
});

gulp.task('react-compile', function() {
	gulp.watch(['./public/components/**/*.jsx',
	 './public/actions/**/*.js',
	  './public/constants/**/*.js',
	  './public/dispatcher/**/*.js',
	  './public/stores/**/*.js'],
	   ['compile-jsx']);
});

gulp.task('stylus-compile', function() {
	gulp.watch('./public/css/**/*.styl', ['compile-stylus']);
});

gulp.task('default', ['server', 'react-compile', 'stylus-compile', 'compile-stylus', 'compile-jsx'])