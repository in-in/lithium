const path = require('path');
const { PATHS } = require('./paths');

const buildPath = path.join(PATHS.tokens, 'build', '/');

module.exports = {
	'source': [
		`${PATHS.tokens}/properties/**/*.{js,json}`,
	],
	'platforms': {
		'scss': {
			'transformGroup': 'web',
			'transforms': [
				'name/cti/snake',
				'color/css',
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
			'transformGroup': 'web',
			'transforms': [
				'attribute/cti',
				'name/cti/snake',
				// 'name/human',
				'color/css',
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
