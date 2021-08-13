'use strict';

const { task, src, dest, watch, series } = require('gulp');

// --- HTML-утилиты ---
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');

// --- CSS-утилиты ---
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// --- Препроцессорные утилиты ---
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');

// --- JS-утилиты ---
const concat = require('gulp-concat');

// --- Оптимизация изображений ---
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');

// --- Вспомогательные утилиты ---
const rename = require('gulp-rename');
const del = require('del');
const pipeline = require('readable-stream').pipeline;
const mergeStream = require('merge-stream');

// --- Серверные утилиты ---
const server = require('browser-sync').create();


/*
=====================================================
----------------------- ТАСКИ -----------------------
=====================================================
*/

// *** Обработка HTML-файлов ***
task('html', () => {
  return pipeline(
    src('source/*.html'),
    posthtml([
      include()
    ]),
    dest('build')
  );
});


// *** Обработка всех SCSS-файлов и преобразование их в CSS-файлы ***
task('css', () => {
  const mainCss = pipeline(
    src('source/sass/styles.scss'),
    plumber(),
    sourcemap.init(),
    sass(),
    postcss([
      autoprefixer()
    ]),
    csso(),
    rename('styles.min.css'),
    sourcemap.write('.'),
    dest('build/css'),
    server.stream()
  );

  const vendorCss = pipeline(
    src('source/vendor-css/**/*.css'),
    dest('build/css/vendor/')
  );

  return mergeStream(mainCss, vendorCss);
});


// *** Сборка всех JS-файлов ***

/* --- основные скрипты — main.js --- */
task('js', () => {
  return pipeline(
    src('source/js/*.js'),
    concat('main.js'),
    dest('build/js')
  );
});

/* --- библиотеки — vendor.js --- */
task('vendorjs', () => {
  return pipeline(
    src('source/js/vendor/*.js'),
    concat('vendor.js'),
    dest('build/js')
  );
});


// *** Оптимизация изображений ***
task('images', () => {
  return pipeline(
    src('source/img/**/*.{png,jpg,svg}'),
    imagemin([
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.mozjpeg({quality: 90, progressive: true }),
      imagemin.svgo()
    ]),
    dest('source/img')
  );
});


// *** Переформатирование изображений в WebP ***
task('webp', () => {
  return pipeline(
    src('source/img/**/*.{png,jpg}'),
    webp({ quality: 90 }),
    dest('source/img')
  );
});


// *** Сборка SVG-спрайта ***
task('sprite', () => {
  return pipeline(
    src('source/img/**/{icon-*,htmlacademy*}.svg'),
    cheerio({
      run: ($) => {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true },
    }),
    svgstore({ inlineSvg: true }),
    rename('sprite_auto.svg'),
    dest('build/img')
  );
});


// *** Копирование файлов ***
task('copy', () => {
  return pipeline(
    src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source//*.ico'
    ], {
      base: 'source'
    }),
    dest('build')
  );
});


// *** Очистка директории build/ ***
task('clean', () => {
  return del('build');
});


// *** Работа с Сервером ***
task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  watch('source/*.html', series('html', 'refresh'));
  watch('source/sass/**/*.{scss,sass}', series('css'));
  watch('source/js/*.js', series('js', 'refresh'));
  watch('source/img/icon-*.svg', series('sprite', 'html', 'refresh'));
});

task('refresh', (done) => {
  server.reload();
  done();
});


// === Основные задачи для Сборки проекта в 'продакшн' и поднятие Сервера ===
task('build', series('clean', 'copy', 'css', 'js', 'vendorjs', 'sprite', 'html'));
task('start', series('build', 'server'));
