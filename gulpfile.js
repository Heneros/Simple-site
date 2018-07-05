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

gulp.task('serve', () =>{
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

});

gulp.task('html', () =>{
   return gulp.src('index.html')
   .pipe(gulp.dest('build'))
   .on('end', browserSync.reload);
});    

gulp.task('imagemin', function () {
  return gulp.src('assets/img/*.png')
    .pipe(cache(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('build/'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('less', () => {
  return gulp.src('assets/less/*.less')
    .pipe(sourcemaps.init() )
    .pipe(less())
    .pipe(plumber() )
    .pipe(csso())
    .pipe(concat('build/common.css'))
		.pipe(autoprefixer({
		    browsers: ['last 10 versions'],
		    cascade: false
		}))
		.on("error", notify.onError({
        title: "stytle"
		}))
   .pipe(sourcemaps.write() )
    .pipe(gulp.dest('build/'))
    .pipe( browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', () =>{
   gulp.watch('index.html', gulp.series('html')),
   gulp.watch('assets/**/*.{jpg, png, svg}', gulp.series('imagemin')),
   gulp.watch('assets/**/*.{less, css}', gulp.series('less'))
});

gulp.task('default', gulp.series(
gulp.parallel('html', 'less', 'imagemin'),
gulp.parallel('watch', 'serve')
));
   
