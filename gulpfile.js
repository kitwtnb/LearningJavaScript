const gulp = require("gulp")
const sequence = require("run-sequence")
const del = require("del")
const eslint = require("gulp-eslint")
const stylelint = require("gulp-stylelint")
const pug = require("gulp-pug")
const sass = require("gulp-sass")
const babel = require("gulp-babel")
const jest = require("gulp-jest").default

gulp.task("default", callback => {
  return sequence(
    "clean",
    ["pug", "sass", "babel"],
    ["stylelint", "eslint", "test"],
    callback
  )
})

gulp.task("build", callback => {
  return sequence(
    "clean",
    ["pug", "sass", "babel"],
    callback
  )
})

gulp.task("clean", () => {
  return del(["./dest", "./coverage"])
})

gulp.task("pug", () => {
  return gulp.src("./src/pug/**/*.pug")
             .pipe(pug({ pretty: true }))
             .pipe(gulp.dest("./dest"))
})

gulp.task("sass", () => {
  return gulp.src("./src/sass/**/*.scss")
             .pipe(sass())
             .pipe(gulp.dest("./dest/css"))
})

gulp.task("babel", () => {
  return gulp.src("./src/js/**/*.js")
             .pipe(babel())
             .pipe(gulp.dest("./dest/js"))
})

gulp.task("eslint", () => {
  return gulp.src("./src/**/*.js")
             .pipe(eslint({ useEslintrc: true }))
             .pipe(eslint.format())
             .pipe(eslint.failAfterError())
})

gulp.task("stylelint", () => {
  return gulp.src("./src/sass/**/*.scss")
             .pipe(stylelint({ reporters: [
              {formatter: 'string', console: true}
            ] }))
})

gulp.task("test", () => {
  return gulp.src("./test/**/*.test.js")
             .pipe(jest({ collectCoverage: true }))
})
