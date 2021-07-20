const { src, dest, watch, parallel, series }  = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const terser        = require('gulp-terser');
const del           = require('del');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');



function browsersync() {
  browserSync.init({
    server : {
      baseDir: 'app/'
    }
  });
}

function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/images/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/images'));
} 


function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/simplebar/dist/simplebar.min.js',
    'app/js/main.js'
  ])
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function jsMinify() {
  return src('app/js/script.js')

  .pipe(terser())
  .pipe(dest('dist/js'));
}


function styles() {
  return src([
    'app/scss/style.scss',
    'node_modules/simplebar/dist/simplebar.min.css'
    ])
      .pipe(scss({outputStyle: 'nested'}).on('error', scss.logError))
      .pipe(concat('style.css'))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
      }))
      .pipe(dest('app/css'))
      .pipe(browserSync.stream());
}

function build() {
  return src([
    'app/css/style.css',
    'app/fonts/**/*',
    'app/*.html'
  ], {base: 'app'})
    .pipe(dest('dist'));
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/script.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.jsMinify = jsMinify;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, jsMinify, build);
exports.default = parallel(styles ,scripts ,browsersync, watching);


