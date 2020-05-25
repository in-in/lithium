const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const MediaQueryPlugin = require('media-query-plugin');
const common = require('./webpack.config');
const { PATHS, PAGES } = require('./paths');

const styles = {
	'test': /\.scss$/,
	'use': [
		MiniCssExtractPlugin.loader,
		'css-loader',
		MediaQueryPlugin.loader,
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
					'includePaths': [PATHS.components, path.join(PATHS.tokens, 'build')],
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
	'optimization': {
		'splitChunks': {
			'cacheGroups': {
				'inline': {
					'name': (module, chunks, cacheGroupKey) => cacheGroupKey,
					'test': /inline.scss$/,
					'chunks': 'all',
					'enforce': true,
				},
				'styles': {
					'name': (module, chunks, cacheGroupKey) => cacheGroupKey,
					'test': /style.scss$/,
					'chunks': 'all',
					'enforce': true,
				},
			},
		},
	},
	'plugins': [
		...PAGES.map(
			(name) => new HtmlWebpackPlugin({
				'filename': `${name}.html`,
				'template': path.join(PATHS.pages, `${name}.pug`),
				'inject': false,
				'templateParameters': (compilation, assets, assetTags, options) => ({
					compilation,
					'webpackConfig': compilation.options,
					'htmlWebpackPlugin': {
						'tags': assetTags,
						'files': assets,
						options,
					},
					'env': process.env.NODE_ENV,
				}),
			}),
		),
		new HtmlWebpackInlineSVGPlugin({
			'runPreEmit': true,
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			'filename': '[name].[contenthash].css',
		}),
		new CssoWebpackPlugin(),
		new MediaQueryPlugin({
			'include': true,
			'queries': {
				// s
				'(min-width: 640px)': 's',
				[
				'(min-width: 640px)and (-webkit-min-device-pixel-ratio: 2), '
				+ '(min-width: 640px)and (min-resolution: 2x)'
				]: 's',
				[
				'(min-width: 640px)and (-webkit-min-device-pixel-ratio: 3), '
				+ '(min-width: 640px)and (min-resolution: 3x)'
				]: 's',

				// m
				'(min-width: 960px)': 'm',
				[
				'(min-width: 960px)and (-webkit-min-device-pixel-ratio: 2), '
				+ '(min-width: 960px)and (min-resolution: 2x)'
				]: 'm',
				[
				'(min-width: 960px)and (-webkit-min-device-pixel-ratio: 3), '
				+ '(min-width: 960px)and (min-resolution: 3x)'
				]: 'm',

				// l
				'(min-width: 1280px)': 'l',
				[
				'(min-width: 1280px)and (-webkit-min-device-pixel-ratio: 2), '
				+ '(min-width: 1280px)and (min-resolution: 2x)'
				]: 'l',
				[
				'(min-width: 1280px)and (-webkit-min-device-pixel-ratio: 3), '
				+ '(min-width: 1280px)and (min-resolution: 3x)'
				]: 'l',

				// xl
				'(min-width: 1440px)': 'xl',
				[
				'(min-width: 1440px)and (-webkit-min-device-pixel-ratio: 2), '
				+ '(min-width: 1440px)and (min-resolution: 2x)'
				]: 'xl',
				[
				'(min-width: 1440px)and (-webkit-min-device-pixel-ratio: 3), '
				+ '(min-width: 1440px)and (min-resolution: 3x)'
				]: 'xl',
			},
		}),
	],
	'module': {
		'rules': [
			styles,
			images,
		],
	},
};

module.exports = merge.smart(common, config);
