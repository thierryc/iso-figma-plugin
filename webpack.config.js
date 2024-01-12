const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = (env, argv) => ({
	mode: argv.mode === "production" ? "production" : "development",

	entry: {
		code: "./src/code.ts",
		ui: "./src/ui.ts",
	},

	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		pathinfo: false,
		clean: true,
	},

	devtool: argv.mode === "production" ? false : "inline-source-map",

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							happyPackMode: true,
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ["@svgr/webpack"],
			},
			{
				test: /\.(ttf|woff2|jpe?g|png|gif|avif|av1|webp|svg)$/,
				type: "asset/inline",
				exclude: /node_modules/,
			},
		],
	},

	// Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/ui.html",
			filename: "ui.html",
			inlineSource: ".(js)$",
			chunks: ["ui"]
		}),
		new HtmlInlineScriptPlugin()
	],

	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
		modules: ["src", "node_modules"],
	},

	experiments: {
		topLevelAwait: true,
	},

	performance: { hints: false },
})