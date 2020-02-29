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
			'loader': 'sass-loader',
			'options': {
				'sassOptions': {
					'includePaths': [PATHS.components],
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
		],
	},
};
module.exports = merge(common, config);
