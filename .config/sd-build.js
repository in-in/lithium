/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const Handlebars = require('handlebars');
const sd = require('style-dictionary');
const { 'PATHS': { config, templates } } = require('./paths');

const sdExtended = sd.extend(`${config}/sd-config.js`);

const template = Handlebars.compile(fs
	.readFileSync(`${templates}/map-nested.hbs`)
	.toString());

sdExtended.registerFormat({
	'name': 'map-nested',
	formatter(dictionary) {
		return template({
			'properties': dictionary.properties,
		});
	},
});

sdExtended.buildAllPlatforms();
