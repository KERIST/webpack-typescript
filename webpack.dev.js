const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/script/app.js'),
    output: {
		filename: 'script/bundle.js',
		path: path.resolve(__dirname, './dist')
	},
    resolve: {
		modules: ['node_modules', path.resolve(__dirname, './src')],
		extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
		descriptionFiles: ['package.json'],
	}, 
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				loader: 'babel-loader',
				//include: path.resolve(__dirname, '/app'),
				exclude: /(node_modules)/,
				options: {
					presets: ['es2015', 'react', 'stage-2'],
				},
			},
			{
				test: /\.(css|scss)?$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [ 'css-loader', 'sass-loader'],
					publicPath: path.resolve(__dirname, './dist/style')
				})
			}
		]
    },
    plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),
		new ExtractTextPlugin({
			filename: 'style/style.css',
			disable: false,
			allChunks: true
		})
	],
    devtool: 'source-map',
	target: 'web',
    cache: false,
    watchOptions: {
		aggregateTimeout: 500,
		poll: true,
	},
	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		compress: true,
		inline: true,
		port: 7070,
	},  
};