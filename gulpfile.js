const gulp = require('gulp')
  , sass = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , cssnano = require('gulp-cssnano')
  , babel = require('gulp-babel')
  , minify = require('gulp-minify')
  , nodemon = require('gulp-nodemon')
  , clean = require('gulp-clean')
  , sourcemaps = require('gulp-sourcemaps')
  , browserify = require("browserify")
  , source = require('vinyl-source-stream')
  , tsify = require("tsify")
  , uglify = require('gulp-uglify')
  , buffer = require('vinyl-buffer')
  , ts = require("gulp-typescript")
  , tsProject = ts.createProject("./src/tsconfig.json")
  , client = 'client/'
  , devPath = 'src/'
  , common = 'common/'
  , path = 'dist/';

gulp.task("ts-server", function() {
  return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest(path));
});

gulp.task("ts-client", function () {
  return browserify({
      basedir: devPath + client,
      debug: true,
      entries: ['js/game.ts'],
      cache: {},
      packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .on('error', function(e) {
      console.log(e);
      this.emit('end');
    })
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  // .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(path + client));
});


gulp.task('scss', function () {
  return gulp.src([
    devPath + client + 'scss/**/*.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
  .pipe(cssnano())
  .pipe(gulp.dest(path + client + 'css'));
});


gulp.task("nodemon", function () {
  nodemon({
    script: 'app.js'
  , ignore: [devPath, path + client, path + common, 'gulpfile.js']
  , ext: 'js'
  , env: { 'NODE_ENV': 'development' }
  })
});


gulp.task('clean', function() {
 return gulp.src(path + '/*')
 .pipe(clean());
});


gulp.task("rest", function () {
  return gulp.src([
    devPath + '**/*.*',
    '!' + devPath + 'js/**/*.js',
    '!' + devPath + '**/*.ts',
    '!' + devPath + '**/*.scss',
    '!**/tsconfig.json',
  ])
  .pipe(gulp.dest(path));
});


gulp.task('rest:watch', function () {
  gulp.watch([
    devPath + '**/*.*',
    '!' + devPath + '**/*.js',
    '!' + devPath + '**/*.scss',
    '!' + devPath + '**/*.ts',
  ], ['rest']);
});


gulp.task('scss:watch', function () {
  gulp.watch([
    devPath + '**/*.scss'
  ], ['scss']);
});


gulp.task("prestart", ['clean'],function() {
  gulp.start("start");
});

gulp.task("start", ['scss', 'rest', 'ts-client', "ts-server"], function () {
  gulp.start(['nodemon']);
});


gulp.task('ts-client:watch', function () {
  gulp.watch([
    devPath + client + 'js/**/*.ts',
    devPath + common + '**/*.ts',
  ], ['ts-client']);
});

gulp.task('ts-server:watch', function () {
  gulp.watch([
    devPath + '**/*.ts',
    devPath + '**/*.ts',
    '!' + devPath + client + 'js/**/*.ts',
  ], ['ts-server']);
});

gulp.task('default', ['prestart', 'scss:watch', 'ts-client:watch', 'ts-server:watch', 'rest:watch'], function () {});
