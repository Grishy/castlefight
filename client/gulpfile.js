const gulp = require("gulp");
const connect = require("gulp-connect");
const rollup = require("gulp-rollup");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("public", () => {
    gulp.src("public/**/*")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

gulp.task("connect", () => {
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    });
});

gulp.task("ts", () => {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("temp"));
});

gulp.task("rollup", ["ts"], function() {
    gulp.src("./temp/**/*.js")
        .pipe(
            rollup({
                input: "./temp/main.js",
                output: {
                    format: "iife"
                }
            })
        )
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
});

gulp.task("watch", () => {
    gulp.watch("src/**/*.*", ["rollup"]);
    gulp.watch("public/**/*.*", ["public"]);
});

gulp.task("default", ["public", "watch", "rollup", "connect"]);
