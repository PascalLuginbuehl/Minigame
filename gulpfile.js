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
    .pipe(uglify())
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
  , ignore: ['src/', 'public/', 'gulpfile.js']
  , ext: 'js'
  , env: { 'NODE_ENV': 'development' }
  })
});


// gulp.task("js", function () {
//   return gulp.src([
//     devPath + "js/**/*.js"
//   ])
//
//   // .pipe(sourcemaps.init())
//   //   .pipe(babel({
//   //     presets: ['es2015']
//   //   }))
//   //   .on('error', function(e) {
//   //     console.log(e.codeFrame);
//   //     this.emit('end');
//   //   })
//   //   .pipe(minify())
//   // .pipe(sourcemaps.write())
//
//   .pipe(gulp.dest(path + 'js'));
// });


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


// gulp.task('js:watch', function () {
//   gulp.watch([
//     devPath + 'js/**/*.js'
//   ], ['js']);
// });

gulp.task('start', ['clean'], function () {
  gulp.start(['scss', 'rest', 'ts-client', "ts-server"]);
});


gulp.task('ts-client:watch', function () {
  gulp.watch([
    devPath + client + 'js/**/*.ts'
  ], ['ts-client']);
});

gulp.task('ts-server:watch', function () {
  gulp.watch([
    devPath + 'js/**/*.ts'
  ], ['ts-server']);
});

gulp.task('default', ['start', 'scss:watch', 'ts-client:watch', 'ts-server:watch', 'nodemon', 'rest:watch'], function () {});
