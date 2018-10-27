// Gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('build', function() {
    console.log('')
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['build']);
});

gulp.task('default', ['build', 'watch']);