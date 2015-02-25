var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var reload  = browserSync.reload;

// Clean up .temp and scripts/min directories
gulp.task('clean', function(){
  return gulp.src('./.temp/**.*')
    .pipe(clean());
  return gulp.src('./scripts/min/**.*')
    .pipe(clean());
});

// Compass + Autoprefixer + minify CSS
gulp.task('compass', function () {
  gulp.src('./sass/*.scss')
      .pipe(compass({
        css: './css',
        sass: './sass',
        image: './images'
      }))
      .pipe(autoprefixer({
        browsers: ['last 3 versions', 'iOS 7']
      }))
      .pipe(minify())
      .pipe(gulp.dest('./css'))
      .pipe(reload({stream: true}));
});

// Compile everything in bower_components
gulp.task('compile_lib', function(){
  return gulp.src(mainBowerFiles())
    .pipe(concat('lib-min.js'))
    .pipe(gulp.dest('./.temp'))
    .pipe(rename('lib-min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./scripts/min'));
});

// Minify app javascript
gulp.task('minify', function(){
  return gulp.src('./scripts/*.js')
    .pipe(concat('main-min.js'))
    .pipe(gulp.dest('./.temp'))
    .pipe(rename('main-min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./scripts/min'));
});

// Serve task:
// clean temp and min directories, complile everything in bower_components,
// minify JS, compile compass, and reload browser on changes.
gulp.task('serve', ['clean', 'compile_lib', 'minify', 'compass'], function() {
  browserSync({
    server: "./"
  });
  gulp.watch("./sass/*.scss", ['compass']);
  gulp.watch("./*.html").on('change', reload);
  gulp.watch("./scripts/*.js").on('change', reload);
});

// Serve by default.
gulp.task('default', ['serve']);