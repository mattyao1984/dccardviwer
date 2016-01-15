var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var streamify = require('gulp-streamify');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep').stream;
var _ = require('lodash');

var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var server = require('tiny-lr')();
var lrPort = 35730;

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'lodash'
];

//Start server
gulp.task('serve', function(){
  nodemon({
    'script': 'server.js'
  }).on('restart', function(){
    gulp.src('server.js')
      .pipe(livereload(server))
      .pipe(notify('Reloading page, please wait...'));
  });
});

gulp.task('wiredep', function () {
  gulp.src('views/index.html')
    .pipe(wiredep({
      directory: 'public/bower_components',
      ignorePath: '../public'
    }))
    .pipe(gulp.dest('./views'))
    .pipe(livereload(server));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['browserify-vendor'], function() {
  return browserify('app/main.js')
    .external(dependencies)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'))
    .pipe(livereload(server));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', ['browserify-vendor'], function() {
  livereload.listen();

  var bundler = watchify(browserify('app/main.js', watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify, { presets: ['es2015', 'react'] })
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/js/'))
      .pipe(livereload(server));
  }
});

/*
 |--------------------------------------------------------------------------
 | Compile SASS stylesheets.
 |--------------------------------------------------------------------------
 */

gulp.task('lr', function(){
 server.listen(lrPort, function(err){
   if(err) {return console.error(err);}
 });
});

gulp.task('sass', function () {
  gulp.src(['public/sass/*.scss', 'app/components/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(livereload(server));
});

gulp.task('watch', function () {
  gulp.watch(['public/sass/*.scss', 'app/components/**/*.scss'], ['sass']);
  gulp.watch(['bower.json'], ['wiredep']);
});

gulp.task('default', ['sass', 'wiredep', 'lr', 'serve', 'browserify-watch', 'watch']);
gulp.task('build', ['sass', 'browserify']);
