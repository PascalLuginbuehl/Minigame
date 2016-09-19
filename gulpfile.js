const gulp = require('gulp')
  , sass = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , cssnano = require('gulp-cssnano')
  , babel = require('gulp-babel')
  , minify = require('gulp-minify')
  , nodemon = require('gulp-nodemon')
  , clean = require('gulp-clean')
  , sourcemaps = require('gulp-sourcemaps')
  , devPath = 'src/'
  , path = 'public/';

gulp.task('scss', function () {
  return gulp.src([
    devPath + 'scss/**/*.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
  .pipe(cssnano())
  .pipe(gulp.dest(path + 'css'));
});


gulp.task("nodemon", function () {
  nodemon({
    script: 'app.js'
  , ignore: ['src/', 'public/', 'gulpfile.js']
  , ext: 'js'
  , env: { 'NODE_ENV': 'development' }
  })
});


gulp.task("js", function () {
  return gulp.src([
    devPath + "js/**/*.js"
  ])

  // .pipe(sourcemaps.init())
  //   .pipe(babel({
  //     presets: ['es2015']
  //   }))
  //   .on('error', function(e) {
  //     console.log(e.codeFrame);
  //     this.emit('end');
  //   })
  //   .pipe(minify())
  // .pipe(sourcemaps.write())

  .pipe(gulp.dest(path + 'js'));
});


gulp.task('clean', function() {
 return gulp.src(path + '/*')
 .pipe(clean());
});


gulp.task("rest", function () {
  return gulp.src([
    devPath + '**/*.*',
    '!' + devPath + 'js/**/*.js',
    '!' + devPath + 'scss/**/*.scss'
  ])
  .pipe(gulp.dest(path));
});


gulp.task('rest:watch', function () {
  gulp.watch([
    devPath + '**/*.*',
    '!' + devPath + '**/*.js',
    '!' + devPath + '**/*.scss'
  ], ['rest']);
});


gulp.task('scss:watch', function () {
  gulp.watch([
    devPath + 'scss/**/*.scss'
  ], ['scss']);
});


gulp.task('js:watch', function () {
  gulp.watch([
    devPath + 'js/**/*.js'
  ], ['js']);
});

gulp.task('start', ['clean'], function () {
  gulp.start(['scss', 'js', 'rest']);
})

gulp.task('default', ['start', 'scss:watch', 'js:watch', 'nodemon', 'rest:watch'], function () {});
