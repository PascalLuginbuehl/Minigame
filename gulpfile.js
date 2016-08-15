const gulp = require('gulp')
  , sass = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , csso = require('gulp-csso')
  , concat = require('gulp-concat')
  , devPath = 'client/dev/'
  , path = 'client/assets/'
  , config = require('./client/dev/gulp.json');

gulp.task('scss', function() {
  return gulp.src([
    devPath + 'scss/**/*.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
  .pipe(csso())
  .pipe(gulp.dest(path + 'css'));
});


gulp.task('scss:watch', function() {
  gulp.watch([
    devPath + 'scss/**/*.scss'
  ], ['scss']);
});


var defaultTasks = ['scss:watch'];

for (var i = 0; i < config.merge.length; i++) {

  let task = config.merge[i];

  for (var o = 0; o < task.files.length; o++) {
    task.files[o] = devPath + task.files[o]
  }

  gulp.task(task.taskname, function() {
    return gulp.src(task.files)
    .pipe(concat(task.target))
    .pipe(gulp.dest(path + task.folder));
  });

  gulp.task(task.taskname + ':watch', function() {
    gulp.watch(task.files, [task.taskname]);
  });

  defaultTasks.push(task.taskname + ':watch');
}

gulp.task('default', defaultTasks, function() {});
