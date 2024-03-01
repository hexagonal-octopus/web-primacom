var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var del = require('del');

// CONFIG
// ========================================
//var globalData = require('./src/data/default.json');

// Error handling
// ========================================
// Setup an error handler to format errors, output to terminal, and create a notification
var onError = function(err){
   console.log(err.toString());

   var lineNumber = (err.line) ? 'Line ' + err.line + ' -- ' : '';

   notify({
      title: 'Task Failed [' + err.plugin + ']',
      message: lineNumber + 'See console.'
   }).write(err);

   // Prevent the 'watch' task from stopping
   this.emit('end');
}

// SERVER
// ========================================
var bs = require('browser-sync').create();

gulp.task('browser-sync', function(){
   bs.init({
      startPath: './dist',
      server: {
         baseDir: "./"
      }
   });
});

// DEVELOPMENT STYLESHEET
// ========================================
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass',function(callback){
  return gulp
  .src('src/sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber({
      errorHandler: onError
   }))
  .pipe(sass({
    style: 'expanded'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/assets/styles/'))
  .pipe(bs.stream());
});

// HTML TEMPLATE
// ========================================
var nunjucksRender = require('gulp-nunjucks-render');
//var data = require('gulp-data');

gulp.task('nunjucks', function(callback){
  return gulp.src('./src/pages/**/*.+(html|njk)')
  .pipe(plumber({
      errorHandler: onError
   }))
    .pipe(nunjucksRender({
        path: ['./src/']
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('browser-reload', ['nunjucks'], function(done){
  bs.reload();
  done();
});

// JAVASCRIPT
// ========================================
var jshint = require('gulp-jshint');

gulp.task('jshint',function(){
   return gulp.src('.dist/assets/js/script.js')
   .pipe(plumber({
      errorHandler: onError
   }))
   .pipe(jshint())
   .pipe(jshint.reporter('default'))
  .pipe(bs.stream());
});

// VENDOR
// ========================================
var mainBowerFiles = require('main-bower-files');
var bowerNormalize = require('gulp-bower-normalize');

gulp.task('delete-vendor',function(){
  del.sync(['dist/vendor','!dist/vendor','!dist/vendor/revo','!dist/vendor/revo/**/*', '!dist/vendor/themify','!dist/vendor/themify/**/*']);
});

gulp.task('bower',['delete-vendor'],function(callback){
  return gulp.src(mainBowerFiles(),{'base' : './bower_components'})
  .pipe(bowerNormalize({'bowerJson': './bower.json'}))
  .pipe(gulp.dest('./dist/vendor'))
});


// WATCH
// ========================================
gulp.task('watch', function(){
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.+(njk|nunjucks|html)', ['browser-reload']);
  gulp.watch('./dist/assets/js/script.js', ['jshint']);
});

/* ==================
  GULP DEFAULT
================== */
gulp.task('default',['sass', 'nunjucks', 'jshint', 'watch','browser-sync']);


