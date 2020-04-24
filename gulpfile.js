// Gulp file for scaffolding the project structure
var gulp = require('gulp'),
    filter = require('gulp-filter'),
    plugin = require('gulp-load-plugins')();

// GULP VARIABLES
// Set path to Foundation files
const FOUNDATION = 'node_modules/foundation-sites';

// Select Foundation components, remove components project will not use
const SOURCE = {
    scripts: [
        // Lets grab what-input first
        'node_modules/what-input/dist/what-input.js',

        // Foundation core - needed if you want to use any of the components below
        FOUNDATION + '/dist/js/plugins/foundation.core.js',
        FOUNDATION + '/dist/js/plugins/foundation.util.*.js',

        // Pick the components you need in your project
        FOUNDATION + '/dist/js/plugins/foundation.abide.js',
        FOUNDATION + '/dist/js/plugins/foundation.accordion.js',
        FOUNDATION + '/dist/js/plugins/foundation.accordionMenu.js',
        FOUNDATION + '/dist/js/plugins/foundation.drilldown.js',
        FOUNDATION + '/dist/js/plugins/foundation.dropdown.js',
        FOUNDATION + '/dist/js/plugins/foundation.dropdownMenu.js',
        FOUNDATION + '/dist/js/plugins/foundation.equalizer.js',
        FOUNDATION + '/dist/js/plugins/foundation.interchange.js',
        FOUNDATION + '/dist/js/plugins/foundation.magellan.js',
        FOUNDATION + '/dist/js/plugins/foundation.offcanvas.js',
        FOUNDATION + '/dist/js/plugins/foundation.orbit.js',
        FOUNDATION + '/dist/js/plugins/foundation.responsiveAccordionTabs.js',
        FOUNDATION + '/dist/js/plugins/foundation.responsiveMenu.js',
        FOUNDATION + '/dist/js/plugins/foundation.responsiveToggle.js',
        FOUNDATION + '/dist/js/plugins/foundation.reveal.js',
        FOUNDATION + '/dist/js/plugins/foundation.slider.js',
        FOUNDATION + '/dist/js/plugins/foundation.smoothScroll.js',
        FOUNDATION + '/dist/js/plugins/foundation.sticky.js',
        FOUNDATION + '/dist/js/plugins/foundation.tabs.js',
        FOUNDATION + '/dist/js/plugins/foundation.toggler.js',
        FOUNDATION + '/dist/js/plugins/foundation.tooltip.js',

        // Place custom JS here, files will be concantonated, minified if ran with --production
        'resources/js/**/*.js'
    ],

    // Scss files will be concantonated, minified if ran with --production
    styles: 'resources/sass/**/*.scss'
};

const PUBLIC = {
    styles: 'public/css/',
    scripts: 'public/js/',
    all: 'public/'
};

const RESOURCES = {
    styles: 'resources/sass/',
    scripts: 'resources/js/',
    all: 'resources/'
};

const JSHINT_CONFIG = {
    "node": true,
    "globals": {
        "document": true,
        "jQuery": true
    }
};

// GULP FUNCTIONS
// JSHint, concat, and minify JavaScript
gulp.task('scripts', function() {

    // Use a custom filter so we only lint custom JS
    const CUSTOMFILTER = filter(RESOURCES.scripts + 'js/**/*.js', {restore: true});

    return gulp.src(SOURCE.scripts)
        .pipe(plugin.plumber(function(error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.babel({
            presets: ['env'],
            compact: true,
            ignore: ['what-input.js']
        }))
        .pipe(CUSTOMFILTER)
            .pipe(plugin.jshint(JSHINT_CONFIG))
            .pipe(plugin.jshint.reporter('jshint-stylish'))
            .pipe(CUSTOMFILTER.restore)
        .pipe(plugin.concat('scripts.js'))
        .pipe(plugin.uglify())
        .pipe(plugin.sourcemaps.write('.')) // Creates sourcemap for minified JS
        .pipe(gulp.dest(PUBLIC.scripts))
});

// Compile Sass, Autoprefix and minify
gulp.task('styles', function() {
    return gulp.src(SOURCE.styles)
        .pipe(plugin.plumber(function(error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.sass())
        .pipe(plugin.cssnano())
        .pipe(plugin.sourcemaps.write('.'))
        .pipe(gulp.dest(PUBLIC.styles))
});

// Watch files for changes (without Browser-Sync)
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch(SOURCE.styles, gulp.parallel('styles'));

    // Watch scripts files
    gulp.watch(SOURCE.scripts, gulp.parallel('scripts'));

});

// Run styles, scripts and foundation-js
gulp.task('default', gulp.parallel('styles', 'scripts'));
