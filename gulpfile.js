const gulp = require("gulp");
const less = require("gulp-less");
const removeFiles = require("gulp-remove-files");
const babel = require("gulp-babel");
const connect = require("gulp-connect");

gulp.task('connect', done => {
	connect.server({
		root: ['./'],
		port: 8080,
		keepalive: true,
		open: {
			browser: 'chrome'
		},
		livereload: true
	})
	done();
});


gulp.task("less", done => {
	gulp
		.src("./css/style.less")
		.pipe(less())
		.pipe(gulp.dest("./dist/css"))
		.pipe(connect.reload());
	done();
});

gulp.task("clear", done => {
	gulp.src("./dist/*").pipe(removeFiles());
	done();
});

gulp.task("js", done => {
	gulp
		.src("./js/main.js")
		.pipe(
			babel({
				presets: ["@babel/env"]
			})
		)
		.pipe(gulp.dest("./dist/js"))
		.pipe(connect.reload());
	done();
});

gulp.task("watch", () => {
	gulp.watch("./css/style.less", gulp.series("less"));
	gulp.watch("./js/main.js", gulp.series("js"));
});

gulp.task("default", gulp.series('connect', 'clear', 'less', 'js', 'watch'));