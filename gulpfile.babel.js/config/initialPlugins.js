const isProd = process.argv.includes("--production");
const isDev = !isProd;

module.exports = {
	isProd,
	isDev,

	htmlmin: {
		collapseWhitespace: isProd,
	},

	webpack: {
		mode: isProd ? "production" : "development",
	},

	imagemin: {
		verbose: true,
	},

	fonter: {
		formats: ["woff", "woff2, svg"],
	},
};
