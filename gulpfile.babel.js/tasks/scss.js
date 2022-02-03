const { src, dest } = require("gulp");

// Конфигуркция
const path = require("../config/path");

// Настройки для плагинов
const initalPlugins = require("../config/initialPlugins");
const initialPlugins = require("../config/initialPlugins");

// Plugins
// const plumber = require("gulp-plumber"); // ловим ошибки при сборке
// const notify = require("gulp-notify"); // отображаем ошибки
const size = require("gulp-size"); // Показывает насколько сжаты были файлы
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso"); //сжатие CSS
const rename = require("gulp-rename"); // Использую для сохрания несжатой версии CSS
const shorthand = require("gulp-shorthand"); // Заменияет все возможные CSS свойства на их краткие формы
const groupCssMediaQueries = require("gulp-group-css-media-queries"); // Группировка медиа-выражений
const sass = require("gulp-sass")(require("sass")); // компилятор sass
const sassGlob = require("gulp-sass-glob"); // позволяет импортировать sass файлы через специальные маски
const webpCss = require("gulp-webp-css"); // поддержка webp в css

// Обработка SCSS
const scss = () => {
	return (
		src(path.scss.src, { sourcemaps: initialPlugins.isDev })
			// .pipe(plumber({ errorHandler: notify.onError() }))
			.pipe(sassGlob())
			.pipe(sass().on("error", sass.logError))
			.pipe(webpCss())
			.pipe(autoprefixer())
			.pipe(shorthand())
			.pipe(groupCssMediaQueries())
			.pipe(size({ title: "main.css" }))
			.pipe(dest(path.scss.dest, { sourcemaps: initialPlugins.isDev }))
			.pipe(rename({ suffix: ".min" }))
			.pipe(csso())
			.pipe(size({ title: "main.min.css" }))
			.pipe(dest(path.scss.dest, { sourcemaps: initialPlugins.isDev }))
	);
};

module.exports = scss;
