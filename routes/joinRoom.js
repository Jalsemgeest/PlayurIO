var express = require('express');
var path = require('path');
var randomwords = require('random-words');
var Redis = require('../controllers/RedisHelper');
var Auth = require('../controllers/Auth');
var Helper = require('../controllers/HelperFunctions');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


module.exports = (function() {
'use strict';

var router = express.Router();
router.use(cookieParser());
router.use(bodyParser());

router.get('/joinRoom', function(req, res, next) {
	console.log('/joiningRoom');
	console.log(req.param('key'));
	if (req.param('key')) {
		var key = req.param('key');
		Redis.getAllFromKey(key+'-RoomInfo', function(err, reply) {
			if (!err) {
				console.log("KEY EXISTS");
				console.log(reply);
				if (reply) {
					console.log(reply);
					var data = JSON.parse(reply);
					var time = new Date(data.created);
					// 24 hours ago.
					var then = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
					if (time > then) {
						console.log("Redirecting");
						console.log(key);
						console.log(res.cookies);

						if (!req.cookies[key+'-Voting']) {
							res.cookie(key+'-Voting', Auth.getUserUUID(), { maxAge: 86400000, httpOnly: true });
						}
						res.redirect("/room/"+key);
					}
				}
			} else {
				res.send({
					error:"Invalid key"
				});
			}
		});
	} else {
		res.send({
			error:"Invalid key"
		});
	}
	
});
return router;
})();