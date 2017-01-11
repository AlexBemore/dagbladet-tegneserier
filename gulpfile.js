const gulp = require("gulp");

var connect = require("gulp-connect-multi")() ;
gulp.task("connect", connect.server({
	root: ["site"],
	port: 1337,
	livereload: true,
	open: {
		browser: "Google Chrome"
	}

}));

//templates
const htmlmin = require('gulp-htmlmin');

gulp.task("templates", function() {
	return gulp.src('./dev/*.html')
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest('./site/'))
	    .pipe(connect.reload());
});

//styles
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
    return gulp.src('./dev/assets/css/*.css')
        .pipe(cssmin())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./site/assets/css/'))
        .pipe(connect.reload());
});

//js
var uglify = require('gulp-uglify');
var pump = require('pump');
gulp.task('compress', function (cb) {
  pump([
        gulp.src('./dev/assets/js/*.js'),
        uglify(),
        gulp.dest('./site/assets/js/')
    ],
    cb
  );
});

//images
const imagemin = require("gulp-imagemin");
gulp.task("images", function() {
	return gulp.src("./dev/images/*")
		.pipe(imagemin())
		.pipe(gulp.dest("./site/images/"))
		.pipe(connect.reload());
});

//watch
gulp.task("watch", function(){
	gulp.watch('./dev/*.html', ["templates"]);
	gulp.watch("./dev/assets/css/*.css", ["styles"]);
	gulp.watch("./dev/images/*", ["images"]);
})


gulp.task("default", ["templates", "styles", "compress", "images"]);
gulp.task("dev", ["default", "connect", "watch"]);
