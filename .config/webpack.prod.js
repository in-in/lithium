const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config');

const PATHS = common.externals.paths;

const style = {
	'test': /\.(sa|sc|c)ss$/,
	'use': [
		MiniCssExtractPlugin.loader,
		'css-loader',
		{
			'loader': 'postcss-loader',
			'options': {
				'config': {
					'path': PATHS.config,
				},
			},
		},
		{
			'loader': 'sass-loader',
			'options': {
				'sassOptions': {
					'includePaths': [PATHS.components],
				},
			},
		},
	],
};

const images = {
	'test': /\.(png|jpe?g|webp)$/i,
	'use': [
		{
			'loader': 'image-webpack-loader',
			'options': {
				'mozjpeg': {
					'progressive': true,
					'quality': 85,
				},
				'optipng': {
					'enabled': false,
				},
				'pngquant': {
					'quality': [0.8, 0.85],
					'speed': 4,
				},
				'webp': {
					'quality': 85,
				},
			},
		},
	],
};

const config = {
	'mode': 'production',
	'output': {
		'filename': '[name].[contenthash].js',
		'path': PATHS.dist,
	},
	'plugins': [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			'filename': '[name].[contenthash].css',
		}),
	],
	'module': {
		'rules': [
			style,
			images,
		],
	},
};

module.exports = merge.smart(common, config);
