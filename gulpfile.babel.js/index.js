const { watch, series, parallel } = require("gulp");

// Time-saving synchronised browser testing
const browserSync = require("browser-sync").create();

// Конфигуркция Gulp
const path = require("./config/path");
const initalPlugins = require("./config/initialPlugins");

// Задачи
const clear = require("./tasks/clear");
const html = require("./tasks/html");
const scss = require("./tasks/scss");
const js = require("./tasks/js");
const img = require("./tasks/img");
const fonts = require("./tasks/fonts");

// Локалные сервер
const server = () => {
	browserSync.init({
		server: {
			baseDir: path.root,
		},
	});
};

// Наблюдение за файлами
const watcher = () => {
	// При изменение html
	watch(path.html.watch, html).on("all", browserSync.reload);
	// При изменение css
	watch(path.scss.watch, scss).on("all", browserSync.reload);
	// При изменение js
	watch(path.js.watch, js).on("all", browserSync.reload);
	// При изменение imgs
	watch(path.img.watch, js).on("all", browserSync.reload);
	// При изменение fonts
	watch(path.fonts.watch, fonts).on("all", browserSync.reload);
};

// Доступные задачи для выполнения
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.fonts = fonts;

const build = series(clear, parallel(html, scss, js, img, fonts));
const dev = series(build, parallel(server, watcher));

// Сборка проекта
exports.dev = dev;
exports.build = build;

exports.default = initalPlugins.isDev ? dev : build;
