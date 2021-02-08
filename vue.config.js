// import webpack from "webpack";

module.exports = {
	chainWebpack: config => {
		const svgRule = config.module.rule("svg");

		svgRule.uses.clear();

		svgRule.use("vue-svg-loader").loader("vue-svg-loader");
	},
	// configureWebpack: {
	// 	plugins: [new webpack.ProvidePlugin({ _: "lodash" })]
	// }
};
