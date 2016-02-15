const seneca = require('seneca')();
const config = require('config');
const movies = require('../data/movies.js');

seneca.use(require('seneca-mem-store'));
seneca.use(require('../api/movies.js'), movies);

module.exports = seneca;
