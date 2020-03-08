const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { PATHS } = require('./paths');

const SRC_PAGES = fs
	.readdirSync(PATHS.pages)
	.filter((i) => i.endsWith('.pug'))
	.map((p) => path.basename(p, '.pug'));

const pug = {
	'test': /\.pug$/,
	'use': {
		'loader': 'pug-loader',
	},
};

const images = {
	'test': /\.(png|jpe?g|webp)$/i,
	'use': [
		{
			'loader': 'file-loader',
			'options': {
				'name': '[name].[contenthash].[ext]',
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
			'name': '[name].[contenthash].[ext]',
			'outputPath': PATHS.fonts,
		},
	},
};

const config = {
	'externals': {
		'paths': PATHS,
	},
	'entry': path.join(PATHS.src, 'index.js'),
	'module': {
		'rules': [
			pug,
			images,
			fonts,
		],
	},
	'plugins': [
		...SRC_PAGES.map(
			(name) => new HtmlWebpackPlugin({
				'filename': `${name}.html`,
				'template': path.join(PATHS.pages, `${name}.pug`),
			}),
		),
	],
};

module.exports = config;
