const seneca = require('seneca')();
const config = require('config');
const bodyParser = require('body-parser');
const express = require('express')();

seneca.use('redis-store', config['redis-store']);

seneca.use(function movieApi(options) {
	this.add({
		action: 'get',
		subject: 'movie'
	},
	function getMovie(msg, respond) {
		respond(null, {
			id: 1,
			title: 'Blue Velvet',
			year: 1989,
			director: 'David Lynch'
		});
	});
});

seneca.ready(function onReady() {
	express
		.use(bodyParser.json())
		.use(seneca.export('web'))
		.listen(3000);
});
