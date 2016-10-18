var gulp = require('gulp');
var template = require('gulp-template-compile');
var concat = require('gulp-concat');

gulp.task('default', function () {
    gulp.src('template/*.html')
        .pipe(template({
            name: function (file) {
                var s = file.relative;
                s = s.substring(0, s.length - 5);
                return s;
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist'));
});