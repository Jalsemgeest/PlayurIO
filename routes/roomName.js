var express = require('express');
var path = require('path');
var Auth = require('../controllers/Auth');
var randomwords = require('random-words');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var roomName = '';
module.exports = (function() {
'use strict';
	
	
	var router = express.Router();

	router.use(cookieParser());

	router.get('/room/:roomName', function(req, res) {

			console.log("BAM");
			if (req.params.roomName) {
				roomName = req.params.roomName;
				res.cookie('roomName', req.params.roomName, { maxAge: 86400000, httpOnly: true });
				res.sendFile(path.join(__dirname + '/../views/room.html'));

				// var str = req.cookies.roomHash !== undefined ? req.cookies.roomHash : req.param('auth');
				// console.log(str);

				// if (str) {
				// 	Auth.verifyHash(str, req.params.roomName, function(isValid) {
				// 		console.log("isValid: " + isValid);
				// 		if (isValid) {
				// 			res.cookie('roomName', req.params.roomName, { maxAge: 86400000, httpOnly: true });
				// 			res.sendFile(path.join(__dirname + '/../views/room.html'));	
				// 		} else {
				// 			// res.cookie("roomHash", '', { maxAge: 0, httpOnly: true });
				// 			// res.redirect('/');
				// 			res.cookie('roomName', req.params.roomName, { maxAge: 86400000, httpOnly: true });
				// 			res.sendFile(path.join(__dirname + '/../views/room.html'));
				// 		}
				// 	});
				// } else {
				// 	console.log("Should go in here.");
				// 	res.cookie('roomName', req.params.roomName, { maxAge: 86400000, httpOnly: true });
				// 	console.log("Does this work");
				// 	res.sendFile(path.join(__dirname + '/../views/room.html'));
				// 	console.log("Huh?");
				// }
			}
			// } else {
			// 	res.cookie('roomName', req.params.roomName, { maxAge: 86400000, httpOnly: true });
			// 	res.sendFile(path.join(__dirname + '/../views/room.html'));
			// }
		// console.log("AUTH: " + req.query.auth);
		
	});
	
	return router;

})();