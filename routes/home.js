var express = require('express');
var path = require('path');

module.exports = (function() {
'use strict';

	var router = express.Router();

	router.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/../views/index.html'));
	});

	return router;
	
})();