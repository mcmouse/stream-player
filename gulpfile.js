/* globals require */
/* jshint node:true */

'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

//Build configuration object
var config = {
  watch: false,
  inputFiles: {
    html: './assets/html/*.html',
    js: './assets/js/start.js',
    swf: './assets/js/libs/*.swf',
    css: './assets/css/*.css',
    scss: ['./assets/sass/*.scss',
      './assets/sass/**/*.scss'
    ],
  },
  outputDir: './dist/',
  outputFiles: {
    js: 'js/main.js',
    css: 'css/libs.css',
    scss: 'css/main.css',
  },
  browserifyOpts: {
    basedir: './',
    paths: [
      './assets/js/src/',
      './assets/js/libs/',
      './assets/templates/',
    ],
    extensions: ['.html'],
  },
  autoprefixerOpts: {
    cascade: false,
  },
  sassOpts: {
    style: 'expanded',
  },
  bundler: false,
};

//Our browserify transforms
var transforms = {
  dev: {
    browserifyShim: require('browserify-shim'),
    compileTemplates: require('node-underscorify').transform({
      extensions: ['html']
    }),
    to5Browserify: require('6to5-browserify'),
    envify: require('envify'),
  },
  prod: {
    browserifyShim: require('browserify-shim'),
    compileTemplates: require('node-underscorify').transform({
      extensions: ['html']
    }),
    to5Browserify: require('6to5-browserify'),
    envify: require('envify'),
    uglifyify: {
      opts: {
        global: true,
      },
      transform: require('uglifyify')
    }
  }
};

//Set our environment, and extend config with environment-specific options
function setEnvironment() {
  config.environment = (gutil.env.hasOwnProperty('env') ? gutil.env.env : 'dev');

  if (config.environment === 'dev') {
    //Dev-only config here
    config.browserifyOpts.debug = true;
  }

  if (config.environment === 'prod') {
    //Production only config here
    //Minify CSS
    config.sassOpts.style = 'compressed';
  }
}

//Log errors
function logError(err) {
  gutil.log('Error! ' + err.message);
}

//Apply browserify stream transforms
function applyTransforms(stream) {
  _.each(transforms[config.environment], function (transform) {
    //If transform object has own options
    if (transform.hasOwnProperty('opts')) {
      //Transform with options
      stream.transform(transform.opts, transform.transform);
    } else {
      //Just transform
      stream.transform(transform);
    }
  });

  return stream;
}

//Get our bundler
function getBundler() {
  if (config.watch) {
    config.bundler = watchify(browserify(config.inputFiles.js, _.extend(config.browserifyOpts, watchify.args)));
  } else {
    config.bundler = browserify(config.inputFiles.js, _.extend(config.browserifyOpts, watchify.args));
  }

  return config.bundler;
}

function bundle() {
  config.bundler
    .bundle()
    .on('error', logError)
  //Pipe bundle into vinyl temporary output file
  .pipe(source(config.outputFiles.js))
  //Write file
  .pipe(gulp.dest(config.outputDir))
  //Trigger livereload
  .pipe(gulpif(config.watch, reload({
    stream: true
  })));
}

//Build our JS one time
function buildJS() {

  //Get our transformed browserify bundle
  config.bundler = applyTransforms(getBundler());

  console.log(config.watch);

  if (config.watch) {
    config.bundler.on('update', bundle);
  }

  bundle();

}

//Move our SWF's over
function buildSWF() {
  //Move our libraries
  return gulp.src(config.inputFiles.swf)
    .pipe(gulp.dest(config.outputDir + 'js/libs/'));
}

//For building libraries
function buildCSS() {
  //Move our libraries
  return gulp.src(config.inputFiles.css)
    .pipe(gulpif(config.environment === 'prod', concat(config.outputFiles.css)))
    .pipe(gulp.dest(config.outputDir + 'css/'));
}

function buildSCSS() {
  //Pipe our CSS through autoprefixer, SASS, and concat
  return gulp.src(config.inputFiles.scss)
    .pipe(autoprefixer(config.autoprefixerOpts))
    .pipe(sass())
    .pipe(concat(config.outputFiles.scss))
    .pipe(gulp.dest(config.outputDir))
    .pipe(gulpif(config.watch, reload({
      stream: true
    })));
}

function buildHTML() {
  return gulp.src(config.inputFiles.html)
    .pipe(gulp.dest(config.outputDir))
    .pipe(gulpif(config.watch, reload({
      stream: true
    })));
}

//Set environment based on passed flag
gulp.task('setEnvironment', function () {
  setEnvironment();
});

// clean the output directory
gulp.task('clean', ['setEnvironment'], function (callback) {
  //Clean out the target directory
  del(['./dist/'], callback);
});

gulp.task('html', ['clean'], function () {
  buildHTML();
});

gulp.task('css', ['clean'], function () {
  buildCSS();
  buildSCSS();
});

gulp.task('js', ['clean'], function () {
  buildJS();
});

gulp.task('swf', ['clean'], function () {
  buildSWF();
});

//Persistent build task
gulp.task('build', ['clean', 'html', 'css', 'js', 'swf']);

//Doesn't re-run the JS task because we only want to construct one
//watchify bundler
gulp.task('watch', ['clean', 'html', 'css', 'swf'], function () {
  config.watch = true;
  buildJS();

  gulp.watch(config.inputFiles.html, buildHTML);
  gulp.watch(config.inputFiles.css, buildCSS);
  gulp.watch(config.inputFiles.scss, buildSCSS);
  gulp.watch(config.inputFiles.swf, buildSWF);

  browserSync({
    server: {
      baseDir: './dist/'
    }
  });
});

// WEB SERVER
gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: './dist/'
    }
  });
});

/* jshint ignore:end */