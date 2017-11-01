var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    browser = require("browser-sync"),
    plumber = require("gulp-plumber"),
    sourcemaps = require('gulp-sourcemaps');

gulp.task("server", function() {
  browser({
    server: {
      baseDir: "../"
    }
  });
});


gulp.task("js", function() {
  gulp.src(["js/**/*.js","!js/min/**/*.js"])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(browser.reload({stream:true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("../js"));
 });


gulp.task("sass", function() {
  gulp.src("sass/**/*scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(browser.reload({stream:true}))
    .pipe(gulp.dest("../css"));
});


gulp.task("default", ['server'], function() {
  gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
  gulp.watch("sass/**/*.scss",["sass"]);
});




