var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var browsersync = require('browser-sync').create();
var lr = require('tiny-lr');
var nodemon = require('gulp-nodemon')

function startLivereload() {
    lr.listen(35729);
}

gulp.task('default', function() {
    startLivereload();
})

gulp.task('sass', function(){
    gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(livereload())
});

gulp.task('hello', function() {
    console.log('Hallo, dies wurde mithilfe von Gulp erzeugt')
});

gulp.task('less', function () {
     gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('live', function() {
    gulp.src('css/*.css')
        .pipe(livereload());
});

gulp.task('server', function() {
    nodemon({
        'script': 'server.js'
    });
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('less/*.less', ['less']);
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('css/*.css', ['live']);
    gulp.watch('html/*.html',['html']);
});

gulp.task('html', function(){
    gulp.src('html/*.html')
        .pipe(livereload())
});

gulp.task('serve', ['server','watch']);

