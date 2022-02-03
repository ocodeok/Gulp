const { src, dest } = require("gulp");

// Конфигуркция
const path = require("../config/path");
const initialPlugins = require("../config/initialPlugins");

// Plugins
// const plumber = require("gulp-plumber"); // ловим ошибки при сборке
// const notify = require("gulp-notify"); // отображаем ошибки
const size = require("gulp-size"); // Показывает насколько сжаты были файлы
const concat = require("gulp-concat"); // Объедение всех файлов стилей в один
const cssimport = require("gulp-cssimport"); // заменяет импорту css стилями
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso"); //сжатие CSS
const rename = require("gulp-rename"); // Использую для сохрания несжатой версии CSS
const shorthand = require("gulp-shorthand"); // Заменияет все возможные CSS свойства на их краткие формы
const groupCssMediaQueries = require("gulp-group-css-media-queries"); // Группировка медиа-выражений
const webpCss = require("gulp-webp-css"); // поддержка webp в css

// Обработка CSS
const css = () => {
	return (
		src(path.css.src, { sourcemaps: initialPlugins.isDev })
			// .pipe(plumber({ errorHandler: notify.onError() }))
			.pipe(concat("main.css"))
			.pipe(cssimport())
			.pipe(webpCss())
			.pipe(autoprefixer())
			.pipe(shorthand())
			.pipe(groupCssMediaQueries())
			.pipe(size({ title: "main.css" }))
			.pipe(dest(path.css.dest, { sourcemaps: initialPlugins.isDev }))
			.pipe(rename({ suffix: ".min" }))
			.pipe(csso())
			.pipe(size({ title: "main.min.css" }))
			.pipe(dest(path.css.dest, { sourcemaps: initialPlugins.isDev }))
	);
};

module.exports = css;
