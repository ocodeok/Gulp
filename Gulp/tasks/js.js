const { src, dest } = require("gulp");

// Конфигуркция
const path = require("../config/path");
const initialPlugins = require("../config/initialPlugins");

// Plugins
const plumber = require("gulp-plumber"); // ловим ошибки при сборке
const notify = require("gulp-notify"); // отображаем ошибки
const babel = require("gulp-babel"); // Конвертация современнго js в прошлое поколение. Для конфигурации используется плагин "browserslist" и файл package.json
const webpack = require("webpack-stream");

// Обработка JS
const js = () => {
	return src(path.js.src, { sourcemaps: true })
		.pipe(
			plumber({
				errorHandler: notify.onError((error) => ({
					title: "JS",
					message: error.message,
				})),
			})
		)
		.pipe(babel())
		.pipe(webpack(initialPlugins.webpack))
		.pipe(dest(path.js.dest, { sourcemaps: true }));
};

module.exports = js;
