var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var browsersync = require('browser-sync').create();

gulp.task('sass', function(){
    gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        //.pipe(livereload())
});

gulp.task('hello', function() {
    console.log('Hallo, dies wurde mithilfe von Gulp erzeugt')
});

gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
       // .pipe(livereload());
});

gulp.task('watch', function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('sass/*.scss', ['sass']);
});

