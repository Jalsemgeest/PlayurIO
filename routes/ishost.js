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

router.get('/isHost', function(req, res, next) {
	var isHost = req.cookies.roomHash ||  '';
	if (isHost !== '') {
		res.send({
			hosting:true
		});
	} else {
		res.send({
			hosting:false
		});
	}
	
});
return router;
})();