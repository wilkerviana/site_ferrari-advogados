"use strict";

var gulp      = require('gulp'),
    style     = require('gulp-sass'),
    plumber   = require('gulp-plumber'),
    imagemin  = require('gulp-imagemin'),
    prefixer  = require('gulp-autoprefixer'),
    sourcemap = require('gulp-sourcemaps'),
    styleglob = require('gulp-sass-glob'),
    template  = require('gulp-html-replace'),
    watch     = require('gulp-watch'),
    webpack   = require('webpack-stream'),
    bs        = require('browser-sync');

gulp.task('bs', function(){
  bs.init({
    server:{
      baseDir: 'dist'
    }
  });

  gulp.start(['images', 'script', 'style', 'view']);

  gulp.watch('src/**/*.js', ['script']);
  gulp.watch('src/**/*.scss', ['style']);
  gulp.watch('src/**/*.html', ['view']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('dist/**/*').on('change', () => {
    bs.reload();
  });
});

gulp.task('style',() => {
  gulp.src('src/styles/**/*')
      .pipe(sourcemap.init())
      .pipe(plumber({
        handleError: function(error){
          console.log(error);
          this.emit('end');
        }
      }))
      // .pipe(styleglob())
      .pipe(style())
      .pipe(prefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest('dist/css/style.css'));
});

gulp.task('view', () => {
  gulp.src('src/*.html')
      .pipe(template())
      .pipe(gulp.dest('dist'))
});

gulp.task('images',() => {
  gulp.src('src/images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'))
});

gulp.task('script',() => {
  gulp.src('src/scripts/*.js')
      .pipe(webpack({
        output: {
          filename: '[name].js'
        }
      }))
      .pipe(gulp.dest('dist/js'));
});


// default task with BrowserSync
gulp.task('default',['bs']);