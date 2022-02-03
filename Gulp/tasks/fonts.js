const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path");
const initialPlugins = require("../config/initialPlugins");

// plugins
const plumber = require("gulp-plumber"); // Перехват все ошибок
const notify = require("gulp-notify"); // Демонстрация ошибок
const newer = require("gulp-newer"); // Кэширование шрифтов
const fonter = require("gulp-fonter"); // конвертация шрифтов
const ttf2woff2 = require("gulp-ttf2woff2"); // преобразование ttf2 to woff2

// Обработка Fonts
const fonts = () => {
	return src(path.fonts.src)
		.pipe(
			plumber({
				errorHandler: notify.onError((error) => ({
					title: "Fonts",
					message: error.message,
				})),
			})
		)
		.pipe(newer(path.fonts.dest))
		.pipe(fonter(initialPlugins.fonter))
		.pipe(dest(path.fonts.dest))
		.pipe(src(path.fonts.src))
		.pipe(ttf2woff2())
		.pipe(dest(path.fonts.dest));
};

module.exports = fonts;
