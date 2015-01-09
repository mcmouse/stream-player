/* jshint ignore:start */

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');
var runSequence = require('run-sequence');

var config = {
  entryFile: './assets/js/start.js',
  outputDirs: {
    dev: './dev/',
    dist: './dist/',
  },
  outputFiles: {
    js: 'js/main.js'
  },
  browserifyOpts: _.extend({
    debug: (gutil.env.hasOwnProperty('env') ? (gutil.env.env === 'dev' ? true : false) : true),
    paths: [
      './assets/js/src/',
      './assets/js/libs/',
    ]
  }, watchify.args)
};

var transforms = {
  browserifyShim: require('browserify-shim'),
  compileTemplates: require('browserify-compile-templates'),
  to5Browserify: require('6to5-browserify'),
  envify: require('envify'),
  uglifyify: require('uglifyify'),
}

//Don't recreate bundler object on every recompile
var bundler;

function logError(err) {
  gutil.log('Error! ' + err.message);
}

function applyTransforms(stream) {
  _.each(transforms, function (transform) {
    stream.transform(transform);
  });

  return stream;
}

// Gets browserify bundle stream
function getWatchifyStream() {
  if (!bundler) {
    //Pass watchify args to browserify, as well as debug options
    bundler = watchify(browserify(config.entryFile, config.browserifyOpts));
  }

  console.log(bundler);

  return bundler;
};

function buildJS() {
  var outputDir = (gutil.env.hasOwnProperty('env') ? config.outputDirs[gutil.env.env] : './dev/');

  var bundle = applyTransforms(browserify(config.entryFile, config.browserifyOpts)).bundle();

  return bundle
    //Log errors
    .on('error', logError)
    //Pipe bundle into vinyl temporary output file
    .pipe(source(config.outputFiles.js))
    //Write file
    .pipe(gulp.dest(outputDir));
}

//Execute browserify transforms
function watchJS() {
  var outputDir = (gutil.env.hasOwnProperty('env') ? config.outputDirs[gutil.env.env] : './dev/')

  var bundle = applyTransforms(getWatchifyStream()).bundle();

  //Get watchify stream
  return bundle
    //Log errors
    .on('error', logError)
    //Pipe bundle into vinyl temporary output file
    .pipe(source(config.outputFiles.js))
    //Write file
    .pipe(gulp.dest(outputDir))
    //Trigger livereload
    .pipe(reload({
      stream: true
    }));
}


function buildCSS() {

}

function watchCSS() {

}

function buildHTML() {

}

function watchHTML() {

}

// clean the output directory
gulp.task('clean', function (callback) {
  //Clean out the target directory
  if (gutil.env.hasOwnProperty('env')) {
    del([config.outputDirs[gutil.env.env]], callback);
  } else {
    del(['./dev/', './dist/'], callback);
  }
});

//Persistent build task
gulp.task('build', ['clean'], function () {
  buildJS();
  buildCSS();
  buildHTML();
});

gulp.task('watch', ['build'], function () {
  watchJS();
  watchCSS();
  watchHTML();

  browserSync({
    server: {
      baseDir: './dev/'
    }
  });
});

// WEB SERVER
gulp.task('dist-server', function () {
  browserSync({
    server: {
      baseDir: './dist/'
    }
  });
});

/* jshint ignore:end */