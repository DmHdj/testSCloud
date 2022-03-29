const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Сервер
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

// Компилироание sass кода в css
gulp.task('styles', function() {
    return gulp.src("./src/sass/**/*.sass")
           .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
           .pipe(rename({
            extname: ".min.css",
            }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
           .pipe(gulp.dest("./src/css"))
           .pipe(browserSync.stream());
});

// Перезагрузка страницы при изменениях html и sass файлов
gulp.task('watch', function() {
    gulp.watch("./src/sass/**/*.(scss|sass)", gulp.parallel("styles"));
    gulp.watch("./src/*.html").on("change", browserSync.reload);
});

// Вызов задач
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));