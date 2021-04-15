var gulp = require('gulp');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');

var paths = {
server: ['./httpdocs/'],
  sass: ['./src/scss/**/*.scss'],
  js: ['./src/js/**/*.js'],
  html: ['./src/html/**/*.html']
};

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./httpdocs/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./httpdocs/css/'))
    .on('end', done);
});

gulp.task('scripts', function (done) {
  var bundleStream = browserify('./src/js/scripts.js').bundle();
  bundleStream
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(minify())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('./httpdocs/js/'))
    .on('end', done);
});

// Task to minify HTML
gulp.task('minify-html', function() {
  return gulp.src(paths.html)
  .pipe(htmlmin({ 
    ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /\{[\s\S]*?\}/ ],
    collapseWhitespace: true,
    removeComments: true,
    minifyJS: true,
    minifyCSS: true,
  }))
  //.pipe(gulp.dest('./httpdocs'));
  .pipe(gulp.dest('./system/user/templates/default_site'));
  });

gulp.task('watch', function() {
  gulp.watch(paths.html,  gulp.series('minify-html'));
  gulp.watch(paths.sass, gulp.series('sass'));
  gulp.watch(paths.js, gulp.series('scripts'));
});

gulp.task('webserver', function() {
    connect.server({
    	root: paths.server,
        livereload: true
    });
});

gulp.task('default', gulp.parallel('webserver','minify-html','sass', 'scripts', 'watch'));