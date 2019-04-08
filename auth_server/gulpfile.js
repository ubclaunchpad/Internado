const gulp = require('gulp');

const settings = {
    copy: {
        files: ['src/swagger.json']
    },
    watch: {
        files: ['src/swagger.json']
    },
    base: './'
};

gulp.task('copy', function () {
    return gulp.src(settings.copy.files)
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    return gulp.watch(settings.watch.files).on("change", function (file) {
        gulp.src(settings.watch.files)
            .pipe(gulp.dest('dist'));
    });
})