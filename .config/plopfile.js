const { PATHS } = require('./paths');

const toSnakeCase = (str) => (
	str.includes('-')
		? str.replace('-', '_')
		: str);

const config = (plop) => {
	plop.setGenerator('component', {
		'description': 'Create a component',
		'prompts': [
			{
				'type': 'input',
				'name': 'name',
				'message': 'What is your component name?',
				'filter': (input) => toSnakeCase(input).toLowerCase(),
			},
		],
		'actions': [
			{
				'type': 'add',
				'path': `${PATHS.components}/{{ name }}/index.pug`,
				'templateFile': 'plop-templates/component.pug.hbs',
			},
			{
				'type': 'add',
				'path': `${PATHS.components}/{{ name }}/style.scss`,
				'templateFile': 'plop-templates/component.scss.hbs',
			},
			{
				'type': 'append',
				'path': `${PATHS.styles}/styles.scss`,
				'separator': '',
				'template': "@forward '{{ name }}/style';\n",
			},
		],
	});
};

module.exports = config;
