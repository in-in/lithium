const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const { PATHS, PAGES } = require('./paths');

const isDev = process.env.NODE_ENV !== 'production';

global.icons = path.resolve(PATHS.src, PATHS.icons);
global.sortMq = function sortByDigits(array) {
	const re = /\D/g;
	array
		.sort((a, b) => (
			parseInt(a.query.replace(re, ''), 10) - parseInt(b.query.replace(re, ''), 10)
		));
	return (array);
};

const pug = {
	'test': /\.pug$/,
	'use': {
		'loader': 'pug-loader',
		'options': {
			'globals': ['icons', 'sortMq'],
		},
	},
};

const images = {
	'test': /\.(png|jpe?g|webp)$/i,
	'use': [
		{
			'loader': 'file-loader',
			'options': {
				'name': isDev ? '[name].[ext]' : '[contenthash].[ext]',
				'outputPath': PATHS.images,
			},
		},
	],
};

const fonts = {
	'test': /\.(woff2)$/i,
	'use': {
		'loader': 'file-loader',
		'options': {
			'name': isDev ? '[name].[ext]' : '[contenthash].[ext]',
			'outputPath': PATHS.fonts,
		},
	},
};

const config = {
	'entry': {
		'main': path.join(PATHS.src, 'index.js'),
		'styles': [
			path.resolve(PATHS.styles, 'inline.scss'),
			path.resolve(PATHS.styles, 'styles.scss'),
		],
	},
	'module': {
		'rules': [
			pug,
			images,
			fonts,
		],
	},
	'plugins': [
		...PAGES.map(
			(name) => new HtmlWebpackPlugin({
				'filename': `${name}.html`,
				'template': path.join(PATHS.pages, `${name}.pug`),
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
	],
};

module.exports = config;
