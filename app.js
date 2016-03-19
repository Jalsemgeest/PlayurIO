var express = require('express');
var path = require('path');
var gulp = require('gulp');
var async = require('async');
var request = require('request');
var socketIo = require('socket.io');
var mocha = require('mocha');
var chalk = require('chalk');
var cheerio = require('cheerio');
var redis = require('redis');
var react = require('react');
var mysql = require('mysql');
var handlebars = require('handlebars');
var youtubeIframePlayer = require('youtube-iframe-player');
var gulpLivereload = require('gulp-livereload');
var gulpNodemon = require('gulp-nodemon');
var gulpNotify = require('gulp-notify');
var bodyParser = require('body-parser');
var express = require('express');
// Creating the Web Server 
var app = express();
// View 
var login = require('./routes/login.js');
var create = require('./routes/create.js');
var room = require('./routes/room.js');
// Routes 
app.get('/login', login);
app.get('/create', create);
app.get('/room', room);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});