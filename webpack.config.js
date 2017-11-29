const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: path.resolve(__dirname, './app/src/script/app.js'),
		vendor: [
			'react',
			'react-dom'
		]
	},

	output: {
		filename: 'script/[name].[chunkhash].js',
		path: path.resolve(__dirname, './app/dist')
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
					use: ['css-loader', 'sass-loader'],
					publicPath: path.resolve(__dirname, './app/dist/style')
				})
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['./app/dist']),
		new HtmlWebpackPlugin({
			template: './app/index.html'
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.NoEmitOnErrorsPlugin(),		
		new ExtractTextPlugin({
			filename: 'style/style.min.css',
			disable: false,
			allChunks: true
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.min\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			mangle: false,
			beautify: false,
			comments: false,
			compress: {
				sequences     : true,
				booleans      : true,
				loops         : true,
				unused      : true,
				warnings    : false,
				drop_console: true,
				unsafe      : true
			}
		})
	]
}






































/*
// >> Target Structure <<
// > Root App
const APP_FOLDER = path.resolve(__dirname, './app');
// > Dist
const DIST_FOLDER = path.resolve(APP_FOLDER, './dist');
const DIST_FOLDER_STYLE = path.resolve(DIST_FOLDER, './style');

const DIST_FILE_JS_BUNDLE = 'script/bundle.js';
const DIST_FILE_CSS_BUNDLE_NAME = 'bundle.css';
const DIST_FILE_CSS_BUNDLE = `style/${DIST_FILE_CSS_BUNDLE_NAME}`;
// > Src
const SRC_FOLDER = path.resolve(APP_FOLDER, './src');
const SRC_FILE_JS_APP = path.resolve(SRC_FOLDER, './script/app');

module.exports = {
	// > JS Input / Output
	entry: SRC_FILE_JS_APP,
	output: {
		path: DIST_FOLDER,
		publicPath: '/dist/',
		filename: DIST_FILE_JS_BUNDLE,
		sourceMapFilename: 'sourcemaps/[file].map',
	},
	// > Module Folders (packages and extensions)
	resolve: {
		modules: ['node_modules', APP_FOLDER],
		extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
		descriptionFiles: ['package.json'],
	},
	// > Module Handles
	module: {
		rules: [
			// > JS / JSX
			{
				test: /\.(js|jsx)?$/,
				loader: 'babel-loader',
				include: [APP_FOLDER],
				exclude: /(node_modules)/,
				options: {
					presets: ['es2015', 'react', 'stage-2'],
				},
			},
			// > CSS / SCSS
			{
				test: /\.(css|scss)?$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader/url!file-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: DIST_FOLDER_STYLE,
				}),
			},
		], // rules
	}, // module
	devtool: 'source-map',
	context: __dirname,
	target: 'web',
	plugins: [
				new ExtractTextPlugin({
					filename: DIST_FILE_CSS_BUNDLE,
					disable: false,
					allChunks: true,
				}),
			],
	cache: false,
	watchOptions: {
		aggregateTimeout: 1000,
		poll: true,
	},
	devServer: {
		contentBase: APP_FOLDER,
		compress: true,
		inline: true,
		port: 7070,
	},
};
*/