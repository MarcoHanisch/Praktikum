var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
    gulp.src('sass/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
});

gulp.task('hello', function() {
    console.log('Hallo, dies wurde mithilfe von Gulp erzeugt')
});