"use strict";

const gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  	sass = require('gulp-sass'),
		maps = require('gulp-sourcemaps'),
		babel = require('gulp-babel'),
		gutil = require('gulp-util');

gulp.task("concatScripts", function() {
    return gulp.src([
    	'js/jquery-3.2.1.js',
    	'js/quiz-app.js'
    ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});   

gulp.task("minifyScripts", ["concatScripts"],  function() {
    gulp.src('js/app.js')
    		.pipe(babel({
			      presets: ['env']
			    }))
        .pipe(uglify())
        .on('error', function (err) { 
        		gutil.log(gutil.colors.red('[Error]'), err.toString()); 
        	})
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'))
});

gulp.task("compileSass", function() {
	gulp.src('scss/application.scss')
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
})


gulp.task("build", [ "minifyScripts", "compileSass"]);

gulp.task("default", ["build"]);