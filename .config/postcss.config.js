const path = require('path');
const fs = require('fs');

const saveJSON = (fileName, json) => {
	const { dir, name } = path.parse(fileName);
	const jsonFileName = path.resolve(dir, `${name}.json`);
	fs.writeFileSync(jsonFileName, JSON.stringify(json));
};

module.exports = {
	'plugins': {
		'autoprefixer': {},
		'postcss-normalize': {},
		'postcss-modules': {
			'generateScopedName': '[local]__[hash:base64:5]',
			'getJSON': saveJSON,
		},
		'postcss-sort-media-queries': {
			'sort': 'mobile-first',
		},
		'postcss-csso': {},
	},
};
