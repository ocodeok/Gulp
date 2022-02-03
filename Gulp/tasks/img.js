const { src, dest } = require("gulp");

// Конфигуркция
const path = require("../config/path");
const initialPlugins = require("../config/initialPlugins");

// Plugins
const plumber = require("gulp-plumber"); // ловим ошибки при сборке
const notify = require("gulp-notify"); // отображаем ошибки
const imagemin = require("gulp-imagemin"); //сжатие файлов
const newer = require("gulp-newer"); // caching images
const webp = require("gulp-webp"); // Конвертация изображений в webp

// Обработка IMG
const img = () => {
	return src(path.img.src)
		.pipe(
			plumber({
				errorHandler: notify.onError((error) => ({
					title: "IMG",
					message: error.message,
				})),
			})
		)
		.pipe(newer(path.img.dest))
		.pipe(webp())
		.pipe(dest(path.img.dest))
		.pipe(src(path.img.src))
		.pipe(imagemin(initialPlugins.imagemin))
		.pipe(dest(path.img.dest));
};

module.exports = img;
