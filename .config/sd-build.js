/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const Handlebars = require('handlebars');
const styleDictionary = require('style-dictionary').extend('./.config/sd-config.js');

const template = Handlebars.compile(fs.readFileSync('./.config/map-nested.hbs')
	.toString());

styleDictionary.registerFormat({
	'name': 'map-nested',
	formatter(dictionary) {
		return template({
			'properties': dictionary.properties,
		});
	},
});

styleDictionary.buildAllPlatforms();
