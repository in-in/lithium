const path = require('path');

const PATHS = {
	'root': process.cwd(),
	'assets': 'assets',
	get 'src'() { return path.resolve(this.root, 'src'); },
	get 'dist'() { return path.resolve(this.root, 'dist'); },
	get 'config'() { return path.resolve(this.root, '.config'); },
	get 'pages'() { return path.resolve(this.src, 'pages'); },
	get 'components'() { return path.resolve(this.src, 'components'); },
	get 'styles'() { return path.resolve(this.src, 'styles'); },
	get 'images'() { return path.join(this.assets, 'images'); },
	get 'fonts'() { return path.join(this.assets, 'fonts'); },
};

module.exports = { PATHS };
