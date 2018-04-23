const gulp = require('gulp')
const jest = require('gulp-jest').default

gulp.task('jest', () => {
  return gulp.src('**/*.test.js')
             .pipe(jest())
})
