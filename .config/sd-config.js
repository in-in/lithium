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
				'name/cti/snake',
			],
			'buildPath': buildPath,
			'files': [{
				'destination': 'color.scss',
				'format': 'scss/variables',
				'options': { 'showFileHeader': false },
				'filter': {
					'attributes': {
						'category': 'color',
					},
				},
			}, {
				'destination': 'easing.scss',
				'format': 'scss/variables',
				'options': { 'showFileHeader': false },
				'filter': {
					'attributes': {
						'category': 'easing',
					},
				},
			}, {
				'destination': 'grid.scss',
				'format': 'scss/variables',
				'options': { 'showFileHeader': false },
				'filter': {
					'attributes': {
						'category': 'grid',
					},
				},
			}, {
				'destination': 'shadow.scss',
				'format': 'scss/variables',
				'options': { 'showFileHeader': false },
				'filter': {
					'attributes': {
						'category': 'shadow',
					},
				},
			}, {
				'destination': 'size.scss',
				'format': 'scss/variables',
				'options': { 'showFileHeader': false },
				'filter': {
					'attributes': {
						'category': 'size',
					},
				},
			}, {
				'destination': 'spacing.scss',
				'format': 'scss/variables',
				'options': { 'showFileHeader': false },
				'filter': {
					'attributes': {
						'category': 'spacing',
					},
				},
			}, {
				'destination': 'time.scss',
				'format': 'scss/variables',
				'options': { 'showFileHeader': false },
				'filter': {
					'attributes': {
						'category': 'time',
					},
				},
			}, {
				'destination': 'typography.scss',
				'format': 'scss/variables',
				'options': { 'showFileHeader': false },
				'filter': {
					'attributes': {
						'category': 'typography',
					},
				},
			}],
		},
		'scss-map': {
			'transforms': [
				'attribute/cti',
				'name/cti/snake',
			],
			'buildPath': buildPath,
			'files': [{
				'destination': 'breakpoint.scss',
				'format': 'scss/map-flat',
				'mapName': 'breakpoints',
				'options': { 'showFileHeader': false },
				'filter': {
					'attributes': {
						'category': 'breakpoint',
					},
				},
			}],
		},
		'scss-map-deep': {
			'transforms': [
				'attribute/cti',
				'name/cti/snake',
			],
			'buildPath': buildPath,
			'files': [{
				'destination': 'asset.scss',
				'format': 'map-nested',
				'filter': {
					'attributes': {
						'category': 'asset',
					},
				},
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
