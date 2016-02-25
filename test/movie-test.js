const seneca = require('./util');
const test = require('tape');

seneca.ready(function () {

	test('getMovie returns a seneca entity', function test(t) {
		t.plan(4);
		seneca.act({action: 'get', subject: 'movie', title: 'Die Hard'}, function (err, data) {
			t.equal(null, err, 'no error should be returned when movie is found');
			t.ok(data, 'data is returned');
		});
		seneca.act({action: 'get', subject: 'movie', title: 'Die Flarb'}, function (err, data) {
			t.error(err, 'an error should be returned when movie is not found');
			t.equal(data, null, 'no data is returned');
		});
	});

});
