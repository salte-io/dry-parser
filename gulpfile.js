var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('default', ['test']);

gulp.task('test', function() {
    return gulp.src('./test/**/*.js')
        .pipe(mocha({
            reporter: 'spec'
        }))
        .pipe(istanbul.writeReports({
            dir: './reports',
            reporters: ['lcov']
        }));
});
