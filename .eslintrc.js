module.exports = {
	'extends': ['airbnb-base'],
	'env': {
		'browser': true,
		'node': true,
	},
	'rules': {
		'indent': ['error', 'tab', { 'SwitchCase': 1 }],
		'max-len': ['error', 90, 2],
		'no-tabs': 0,
		'quote-props': ['error', 'always'],
	},
};
