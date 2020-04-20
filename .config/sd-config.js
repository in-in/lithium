const path = require('path');
const { PATHS } = require('./paths');

const buildPath = path.join(PATHS.tokens, 'build', '/');

module.exports = {
	'source': [
		`${PATHS.tokens}/properties/**/*.{js,json}`,
	],
	'platforms': {
		'scss': {
			'transforms': [
				'attribute/cti',
				'color/css',
				'content/quote',
				'name/cti/snake',
				'size/rem',
			],
			'buildPath': buildPath,
			'files': [{
				'destination': 'tokens.scss',
				'format': 'scss/variables',
				'filter': (token) => {
					if (!token.path.includes('breakpoint')) {
						return token;
					}
					return false;
				},
				'options': { 'showFileHeader': false },
			}],
		},
		'scss-map': {
			'transforms': [
				'attribute/cti',
				'color/css',
				'name/cti/snake',
				'size/px',
			],
			'buildPath': buildPath,
			'files': [{
				'destination': 'breakpoint.scss',
				'format': 'scss/map-flat',
				'filter': {
					'attributes': {
						'category': 'breakpoint',
					},
				},
				'mapName': 'breakpoints',
				'options': { 'showFileHeader': false },
			}],
		},
		'js': {
			'transformGroup': 'web',
			'transforms': [
				'name/cti/camel',
			],
			'buildPath': buildPath,
			'files': [{
				'destination': 'tokens.js',
				'format': 'javascript/es6',
				'options': { 'showFileHeader': false },
			}],
		},
		'json': {
			'transformGroup': 'web',
			'transforms': [
				'name/cti/camel',
			],
			'buildPath': buildPath,
			'files': [{
				'destination': 'tokens.json',
				'format': 'json/flat',
				'options': { 'showFileHeader': false },
			}],
		},
	},
};
