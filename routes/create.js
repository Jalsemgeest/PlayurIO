var express = require('express');
var path = require('path');
var randomwords = require('random-words');

module.exports = (function() {
'use strict';

var router = express.Router();

router.get('/create', function(req, res) {
	// res.sendFile(path.join(__dirname + '/../views/create.html'));
	res.send({roomkey:[randomwords(3)]});
});
return router;
})();