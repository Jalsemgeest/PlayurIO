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

var config = {
	js:{
		files:[
			"./public/components/navbar.jsx",
			"./public/components/login-form.jsx",
			"./public/components/main.jsx"
		],
		outputFile:'all.js'
	}
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

gulp.task('compile-jsx', function() {
	try {
		return gulp.src(config.js.files)
			.pipe(plumber({
		        handleError: function (err) {
		            console.log(err);
		            this.emit('end');
		        }
		    }))
		    .pipe(concat(config.js.outputFile))
		    .pipe(react())
			.pipe(gulp.dest('public'));
	} catch (ex) { }
	return;
});

gulp.task('compile-stylus', function() {
	try {
		console.log('Compiling stylus...');
		return gulp.src('./public/css/**/*.styl')
			.pipe(stylus())
			.pipe(gulp.dest('./public/css'));
	} catch (ex) {}
	return;
});

gulp.task('react-compile', function() {
	gulp.watch('public/components/**/*.jsx', ['compile-jsx']);
});

gulp.task('stylus-compile', function() {
	gulp.watch('public/css/**/*.styl', ['compile-stylus']);
});

gulp.task('default', ['server', 'react-compile', 'stylus-compile', 'compile-stylus', 'compile-jsx'])