var express = require('express');
var path = require('path');

module.exports = (function() {
'use strict';

var router = express.Router();

router.get('/room', function(req, res) {
	res.sendFile(path.join(__dirname + '/../views/room.html'));
});
return router;
})();