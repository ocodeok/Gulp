const del = require("del");

// Конфигуркция
const path = require("../config/path");

// удаление директории
const clear = () => {
	return del(path.root);
};

module.exports = clear;
