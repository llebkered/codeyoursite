// Gulp & utilities
var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');

// CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');

// Browser Sync
var browserSync = require('browser-sync').create();

/* ================= */
/* CSS Files */

// Compile SASS and Autoprefix.
gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        // Minify CSS
        //.pipe(csso())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});



// Browser Sync
// see https://www.browsersync.io/docs/gulp/
/*
// Dynamic server
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});
*/
// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


/* ================= */
/* Gulp Watch */

gulp.task('watch', function () {
    // watch scss files
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


/*gulp.task('default', function() {
  // place code for your default task here
});
*/
gulp.task('default', ['sass', 'browser-sync', 'watch']);