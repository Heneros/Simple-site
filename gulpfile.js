'use strict'

const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cache');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const rigger = require('gulp-rigger');



gulp.task('serve', () =>{
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

});

gulp.task('html', () =>{
   return gulp.src('src/index.html')
   .pipe(gulp.dest('build/'))
   .on('end', browserSync.reload);
});    

gulp.task('imagemin',  ()=> {
  return gulp.src('src/img/**/*.{jpg, png, svg}')
    .pipe(cache(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('build/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('fonts', ()=> {
    return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'))
});
gulp.task('less', () => {
  return gulp.src('src/less/style.less')
    .pipe(sourcemaps.init() )
    .pipe(less())
    .pipe(plumber() )
    .pipe(csso())
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .on("error", notify.onError({
        title: "stytle"
    }))
   .pipe(sourcemaps.write() )
    .pipe(gulp.dest('build/css'))
    .pipe( browserSync.reload({
      stream: true
    }));
});
gulp.task('script', function() {
  return gulp.src('src/js/**/*.*')
  .pipe(rigger())
  .pipe(gulp.dest('build/js'));
});
gulp.task('watch', () =>{
   gulp.watch('src/index.html', gulp.series('html')),
   gulp.watch('src/img/**/*.{jpg, png, svg}', gulp.series('imagemin')),
   gulp.watch('src/fonts/**/*.*', gulp.series('fonts')),
   gulp.watch('src/less/style.less', gulp.series('less')),
   gulp.watch('src/js/script.js', gulp.series('script'))
});

gulp.task('default', gulp.series(
gulp.parallel('html', 'less', 'imagemin', 'fonts', 'script'),
gulp.parallel('watch', 'serve')
));