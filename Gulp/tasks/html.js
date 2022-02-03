const { src, dest } = require("gulp");

// Конфигуркция
const path = require("../config/path");

// Настройки для плагинов
const initalPlugins = require("../config/initialPlugins");

// Plugins
// const plumber = require("gulp-plumber"); // ловим ошибки при сборке
// const notify = require("gulp-notify"); // отображаем ошибки
const fileInclude = require("gulp-file-include"); // Шаблонизатор для HTML files
const htmlmin = require("gulp-htmlmin"); // Минимизации HTML
const size = require("gulp-size"); // Показывает насколько сжаты были файлы
const webpHTML = require("gulp-webp-html");

// Обработка HTML
const html = () => {
	return (
		src(path.html.src)
			// .pipe(plumber({ errorHandler: notify.onError() }))
			.pipe(fileInclude())
			.pipe(webpHTML())
			.pipe(size({ title: "До сжатия" }))
			.pipe(htmlmin(initalPlugins.htmlmin))
			.pipe(size({ title: "После сжатия" }))
			.pipe(dest(path.html.dest))
	);
};

module.exports = html;
