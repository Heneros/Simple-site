'use strict'

const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const rigger = require('gulp-rigger');
const image = require('gulp-image');



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


gulp.task('img',  ()=> {
  return gulp.src('src/img/**/*.{jpg, png, svg}')
    .pipe(image({}))
    .pipe(gulp.dest('build/img'))
    .pipe(notify({ message: 'Images task complete' }));
});



gulp.task('fonts', ()=> {
    return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'))
});
gulp.task('less', () => {
  return gulp.src('src/less/style.less', 'src/css/*.css')
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
gulp.task('script', () =>{
  return gulp.src('src/js/**/*.*')
  .pipe(rigger())
  .pipe(gulp.dest('build/js'));
});
gulp.task('watch', () =>{
   gulp.watch('src/index.html', gulp.series('html')),
   gulp.watch('src/img/**/*.{jpg, png, svg}', gulp.series('img')),
   gulp.watch('src/fonts/**/*.*', gulp.series('fonts')),
   gulp.watch('src/**/*.less', gulp.series('less'), browserSync.reload),
   gulp.watch('src/js/script.js', gulp.series('script'))
});

gulp.task('default', gulp.series(
gulp.parallel('html', 'less', 'img', 'fonts', 'script'),
gulp.parallel('watch', 'serve')
));