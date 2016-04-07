var express = require('express');
var path = require('path');
var randomwords = require('random-words');
var Redis = require('../controllers/RedisHelper');
var Auth = require('../controllers/Auth');
var Helper = require('../controllers/HelperFunctions');
var cookieParser = require('cookie-parser');

module.exports = (function() {
'use strict';

function getKey() {
	var key = randomwords(3).map(function(word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			});
	key = key.join().replace(/,/g, '');
	return key;
}

function attemptCreate(key, callback) {
	Redis.getAllFromKey(key, function(err, reply) {
		if (err) {
			console.log("ERROR!");
			return;
		}
		var isValid = false;
		if (reply.length === 0) {
			isValid = true;
		} else {
			var json = JSON.parse(reply[0]);
			if (json) {
				var then = new Date(json.created);
				var now = new Date();
				if (Helper.DateDiff.inDays(then, now) > 0) {
					isValid = true;
				} else {
					console.log("ERROR! - Already exists.");
					attemptCreate(getKey(), callback);
				}
			}
		}
		if (isValid) {
			Redis.initPlaylist(key, function(err, reply, hash) {
				if (err) {
					console.log("ERROR - Creating a playlist.");
					console.log(err);
					return;
				}
				Redis.getAllFromKey(key, function(err, reply) {
					callback({key: key, hash:hash});
				});
			});
		}
	});
}

var router = express.Router();
router.use(cookieParser());

router.get('/createRoom', function(req, res, next) {
	// app.client.set("string", "testing", function(err, reply) {
	// 	console.log("Worked.");
	// });
	// console.log(app.client);
	// console.log(router);
	// res.sendFile(path.join(__dirname + '/../views/create.html'));
	// console.log(req.params.roomKey);
	console.log("HERE?");
	var key = getKey();
	console.log("KEY: " + key);
	key = 'SouthInterestFinal';
	attemptCreate(key, function(data) {
		// console.log(data);
		// console.log(req.cookies);
		res.cookie('roomHash', data.hash, { maxAge: 900000, httpOnly: true });
		console.log("/room/"+data.key+"?auth=" + data.hash);
		res.redirect("/room/"+data.key+"?auth=" + data.hash);
		// next();
	});
	
});
return router;
})();