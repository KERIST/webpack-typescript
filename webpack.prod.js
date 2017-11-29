const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: path.resolve(__dirname, './src/script/app.js'),
		vendor: [
			'react',
			'react-dom'
		]
	},
	output: {
		filename: 'script/bundle.[name].[chunkhash].js',
		path: path.resolve(__dirname, './dist')
	},
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, './src')],
		extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
		descriptionFiles: ['package.json'],
	},
	target: 'web',
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
					publicPath: path.resolve(__dirname, './dist/style')
				})
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['./dist']),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
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
			comments: false
		})
	]
};