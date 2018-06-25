// Run this command to grab the modules
// npm install gulp gulp-rename gulp-notify browser-sync gulp-sass gulp-autoprefixer gulp-clean-css gulp-sourcemaps gulp-concat gulp-uglify gulp-imagemin imagemin-pngquant gulp-svgmin gulp-svg-sprite gulp-combine-mq gulp-if

// Gulp
var gulp        = require('gulp');

// Renaming
var rename      = require('gulp-rename');

// Notifications in OS X rather than having to look at console
var notify      = require('gulp-notify');

// Browsersync
var browserSync = require('browser-sync').create();

// SCSS / AutoPrefixer / Minifier / Sourcemaps
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cleancss    = require('gulp-clean-css');
var sourcemaps  = require('gulp-sourcemaps');
var combineMq   = require('gulp-combine-mq');
// JS Uglifier
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

// Image minification
//var imagemin    = require('gulp-imagemin');
//var pngquant    = require('imagemin-pngquant');
var svgmin      = require('gulp-svgmin');
var svgSprite   = require('gulp-svg-sprite');

// Conditional support
var gulpif      = require('gulp-if');

// General configuration questions

// Is this a Drupal project with Drush installed? Set to "true" or "false" respectively.
var isdrupal              = 'false';
var drushthread           = require('child_process').drushthread;

// Locations of your files

// URL to proxy with BrowserSync
var sync_url              = 'http://ibex.local:8888';

// Extra watch locations for local files that should cause a browsersync reload
var extra_watch_locations = ['./site/snippets/*.php', './site/templates/*.php'];

// Autoprefixer parameters
var autoprefix_params     = '> 1%';

// SCSS locations
var scss_import           = ['./scss/*.scss', './scss/*/**.scss'];
var scss_includepath      = './scss/';
var scss_export_min       = '.min.css';
var scss_export_path      = './css/build/';

// JS locations
var js_concat_import      = ['./js/libs/feature.js', './js/libs/doubletaptogo.js', './js/libs/jquery.mediaWrapper.js', './js/libs/tableit.js', './js/script.js'];
var js_concat_file        = 'production.js';
var js_concat_export      = './js/build';
var js_import             = './js/*.js';
var js_export             = './js/build';

// SVG locations
var svg_import            = ['./svg/*.svg'];
var svg_export            = './svg/build';

var svg_sprite_import     = ['./svg/sprite-src/*'];
var svg_sprite_export     = './svg/sprite-dest';

// Image locations
var img_import            = ['./images/*.**'];
var img_export            = './images/minified';

// Config SVG Sprite Settings
var svgconfig = {
  mode                : {
    view              : {         // Activate the «view» mode
      bust            : false,
      render          : {
        scss          : false      // Activate Sass output (with default options)
      }
  },
    symbol          : true      // Activate the «symbol» mode
  },
  shape     : {
    transform           : []
  }
};

// Compile SCSS and output expanded/minified copies
// as well as notifications in the OS X notification center on error
gulp.task('sass', function (){
	gulp.src(scss_import)
		.pipe(sass({
			includePaths: scss_includepath,
			outputStyle: 'expanded'
		}).on('error', function(err) {
            return notify().write(err);
       	}))
		//.pipe(rename(scss_export_name))
    .pipe(combineMq({beautify: false}))
    .pipe(sourcemaps.init())
    .pipe(prefix(autoprefix_params))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(scss_export_path))
		.pipe(browserSync.stream())
		.pipe(cleancss())
		.pipe(rename(function (path) {
      path.extname = scss_export_min
    }))
		.pipe(gulp.dest(scss_export_path));
});


// Concat JS
gulp.task('scripts', function() {
  return gulp.src(js_concat_import)
    .pipe(concat(js_concat_file))
    .pipe(gulp.dest(js_concat_export));
});


// Uglify JS
gulp.task('uglify', function(){
	gulp.src(js_import)
		.pipe(uglify())
		.pipe(gulp.dest(js_export));
});

// Minify SVGs
gulp.task('svgmin', function() {
	gulp.src(svg_import)
	.pipe(svgmin())
	.pipe(gulp.dest(svg_export));
});

// Create SVG Sprite
gulp.task('svgSprite', function() {
  gulp.src(svg_sprite_import)
    .pipe(svgSprite(svgconfig))
    .pipe(gulp.dest(svg_sprite_export));
});


// Minify images
gulp.task('imagemin', function () {
	gulp.src(img_import)
	.pipe(imagemin({
        progressive: true,
        //use: [pngquant()]
    }))
	.pipe(gulp.dest(img_export));
});

// Drush cache clear
gulp.task('drushcc', function (cb) {
  var cmd = drushthread('drush', ['cc'], {stdio: 'inherit'});
  cmd.on('close', function (code) {
    console.log('Drupal cache has been cleared using "drush cc".');
    cb(code);
  });
});

// Compile SCSS and run Browsersync task on event
gulp.task('default', ['sass', 'scripts', 'uglify', 'svgmin', 'svgSprite', 'bs'], function(){
   // Watch for SCSS changes and compile
   //gulp.watch(scss_import, ['sass', gulpif(isdrupal, drushcc())]); // The Drush CC isn't working at the moment - gulp-if seems to be returning an incorrect condition
   gulp.watch(scss_import, ['sass']);

   // Watch for changes in JS and compile
   gulp.watch(js_import, ['scripts', 'uglify']);
 
   // Watch for changes in SVGs/images and compile
   gulp.watch([svg_import, img_import], ['svgmin']);
 
   // Watch for changes in SVGs/images and compile
   gulp.watch([svg_sprite_import], ['svgSprite']);
});

// Compile SCSS / watch
gulp.task('nobs', ['scripts', 'uglify', 'svgmin', 'svgSprite', 'watch'], function(){

  // Watch for SCSS changes and compile
  gulp.watch(scss_import, ['sass', gulpif(isdrupal, drushcc())]);

  // Watch for changes in JS and compile
  gulp.watch(js_import, ['scripts', 'uglify']);

  // Watch for changes in SVGs/images and compile
  gulp.watch([svg_import, img_import], ['svgmin']);

  // Watch for changes in SVGs/images and compile
  gulp.watch([svg_sprite_import], ['svgSprite']);
});

// Proxy server to local copy of iBec
gulp.task('bs', function() {
  browserSync.init({
    proxy: sync_url,
    notify: {
      styles: [
        'display: none; ',
        'padding: 15px 30px',
        'position: fixed;',
        'font-size: 16px;',
        'z-index: 9999;',
        'right: 0px;',
        'bottom: 0px;',
        'background-color: #F25F5C;',
        'color: #fff;',
        'border-radius: 10px;',
        'margin: 15px;',
        'font-family: "Source Sans Pro", sans-serif;',
        'letter-spacing: 1px',
      ]
    }
  });
	gulp.watch(extra_watch_locations).on('change', browserSync.reload);
});
