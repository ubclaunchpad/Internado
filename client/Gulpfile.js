// Gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('build', function() {
    console.log('')
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'))
});

gulp.task('watch', function() {
    gulp.watch('src/sass/*.scss', ['build']);
});

gulp.task('default', ['build', 'watch']);