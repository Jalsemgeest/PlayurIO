var express = require('express');
var path = require('path');
var Auth = require('../controllers/Auth');
var randomwords = require('random-words');
var cookieParser = require('cookie-parser');

module.exports = (function() {
'use strict';
	
	
	var router = express.Router();

	router.use(cookieParser());

	router.get('/room/:roomName', function(req, res) {

			if (req.params.roomName) {
				var str = req.cookies.roomHash !== undefined ? req.cookies.roomHash : req.param('auth');
				console.log(str);

				Auth.verifyHash(str, req.params.roomName, function(isValid) {
					console.log("isValid: " + isValid);
					if (isValid) {

						res.sendFile(path.join(__dirname + '/../views/room.html'));	
					} else {
						// res.cookie("roomHash", '', { maxAge: 0, httpOnly: true });
						// res.redirect('/');
						console.log('test');
						res.sendFile(path.join(__dirname + '/../views/room.html'));
					}
				});
				
			} else {
				res.sendFile(path.join(__dirname + '/../views/room.html'));
			}
		// console.log("AUTH: " + req.query.auth);
		
	});
	
	return router;

})();