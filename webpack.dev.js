const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/script/app.tsx'), 
	output: {
		filename: 'script/bundle.js',
		path: path.resolve(__dirname, './dist'),
	},
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, './src')],
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css', '.scss'],
		descriptionFiles: ['package.json'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				exclude: /(node_modules)/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.(css|scss)?$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: path.resolve(__dirname, './dist/style'),
				}),
			},
		],
	},
	externals: {
        'react': 'react',
        'react-dom': 'react-dom',
    },
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new ExtractTextPlugin({
			filename: 'style/style.css',
			disable: false,
			allChunks: true,
		}),	
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
		historyApiFallback: true,
		compress: true,
		inline: true,
		port: 7070,
	},
};
