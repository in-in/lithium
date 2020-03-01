const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const st = require('./src/styles/style.json');

const PATHS = {
	'src': path.resolve(__dirname, 'src'),
	'dist': path.resolve(__dirname, 'dist'),
	get 'pages'() { return path.resolve(this.src, 'pages'); },
	get 'components'() { return path.resolve(this.src, 'components'); },
	'assets': 'assets',
	get 'images'() { return path.join(this.assets, 'images'); },
	get 'fonts'() { return path.join(this.assets, 'fonts'); },
};

const pug = {
	'test': /\.pug$/,
	'use': ['pug-loader'],
};

const SRC_PAGES = fs
	.readdirSync(PATHS.pages)
	.filter((i) => i.endsWith('.pug'))
	.map((p) => path.basename(p, '.pug'));

const images = {
	'test': /\.(png|jpe?g|webp)$/i,
	'use': {
		'loader': 'file-loader',
		'options': {
			'name': '[name].[contenthash].[ext]',
			'outputPath': PATHS.images,
		},
	},
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
				'templateParameters': {
					'st': st,
				},
			}),
		),
	],
};

module.exports = config;
