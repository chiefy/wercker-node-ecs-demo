const seneca = require('seneca')();
const config = require('config');
const bodyParser = require('body-parser');
const express = require('express')();
const movies = require('./data/movies.js');

seneca.use('redis-store', config['redis-store']);
seneca.use(require('./api/movies.js'), movies);

seneca.ready(function onReady() {
	express
		.use(bodyParser.json())
		.use(seneca.export('web'))
		.get('/:title', seneca.export('movie'))
		.listen(3000, function onListen() {
			console.log('App listening on port 3000');
		});
});
