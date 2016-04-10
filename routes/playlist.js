var express = require('express');
var path = require('path');
var Auth = require('../controllers/Auth');
var randomwords = require('random-words');
var cookieParser = require('cookie-parser');
var Redis = require('../controllers/RedisHelper');
var bodyParser = require('body-parser');

module.exports = (function() {
'use strict';
	
	var router = express.Router();

	router.use(cookieParser());
	router.use(bodyParser());

	router.post('/playlist/addsong', function(req, res) {

			var room = req.cookies.roomName || '';
			// console.log(req.param(data));
			var song = req.body;
			if (room !== '' && song) {
				Redis.addSong(room, song, function() {
					res.send({
						success:'Song added successfully'
					});
				});
			} else {
				res.send({
					error:'Invalid room name.'
				});
			}
	});

	router.post('/playlist/playNextSong', function(req, res) {
		console.log(req.cookies);
		var hash = req.cookies.roomHash;
		var room = req.cookies.roomName;
		if (hash) {
			// verifyHash: function(oldHash, room, callback)
			Auth.verifyHash(hash, room, function(isValid) {
				if (isValid) {
					console.log("Worked?");
					Redis.nextSong(room, function() {
						console.log("Should have deleted.");
						res.send({
							success:true
						});
					});
				}
			});
		} else {
			res.send({
				error:"Invalid hash."
			})
		}
	});

	router.get('/playlist/getPlaylist', function(req, res) {
		var room = req.cookies.roomName || '';
		if (room !== '') {
			Redis.getAllFromKey(room, function(err, reply) {
				res.send(reply);
			});
		} else {
			res.send({
				error:'Invalid room name.'
			});
		}
	});

	
	return router;

})();