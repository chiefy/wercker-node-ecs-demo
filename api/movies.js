const _ = require('lodash');

const pluginName = 'movie';
const getMoviePattern = {action: 'get', subject: pluginName};

module.exports = function movieApi(movieData) {
	const seneca = this;
	const _entity = seneca.make$(pluginName);

	if (movieData && _.isArray(movieData.movies)) {
		movieData.movies.forEach(importMovie.bind(seneca));
	}

	seneca.add(getMoviePattern, function getMovie(msg, respond) {
		_entity.load$({title: msg.title}, respond);
	});

	return {
		name: pluginName,
		export: routeMovieByTitle.bind(seneca)
	};
};

function routeMovieByTitle(req, res) {
	const pattern = _.extend(getMoviePattern, {
		title: req.params.title
	});

	this.act(pattern, function withData(err, data) {
		if (err || data === null) {
			return res.status(404).json({success: false, error: (err && err.orig && err.orig.code) || 'could not find movie'});
		}
		res.json(data);
	});
}

function importMovie(el) {
	this
		.make$('movie', el)
		.save$(function onSave(err) {
			if (err) {
				throw err;
			}
		});
}
