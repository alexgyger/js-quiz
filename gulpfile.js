"use strict";

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	gutil = require('gulp-util'),
    del = require('del');

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
    return gulp.src('js/app.js')
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
	return gulp.src('scss/application.scss')
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
})

gulp.task('watchFiles', function() {
    gulp.watch('scss/**/*.scss', ['compileSass']);
    gulp.watch('js/quiz-app.js', ['concatScripts']);
})

gulp.task('clean', function() {
    del(['dist', 'css/application.css*', 'js/app*.js*']);
})

gulp.task("build", [ "minifyScripts", "compileSass"], function() {
    // change src 'js/app.js' to **'js/app.min.js'**, when **MINIFY ISSUE** is resolved
    return gulp.src(['css/application.css', 'js/app.js', 'index.html', 'favicon.ico', 'img/**'], {base: './'})
                    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
    gulp.start("build");
});
// gulp default task: possible solution in Gulp 4 with gulp.series() – (Gulp 4 not out yet: working with local version 3.9.1)
// Source API: https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulpseriestasks
// gulp.task("default", gulp.series('clean', 'build'));