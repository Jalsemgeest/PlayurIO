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
var bodyParser = require('body-parser');
var express = require('express');
var redis = require('redis');
var cookieParser = require('cookie-parser');
// Creating the Web Server 
var app = express();
var redisClient = redis.createClient();
// View 
var home = require('./routes/home.js');
var login = require('./routes/login.js');
var create = require('./routes/create.js');
var room = require('./routes/room.js');
var createRoom = require('./routes/createRoom.js');
var roomName = require('./routes/roomName.js');
// var playlist = require('./routes/playlist');
var joinRoom = require('./routes/joinRoom.js');
var isHost = require('./routes/ishost.js');


var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

var io = require("socket.io").listen(server);

// Routes 
app.get('/', home);
app.get('/login', login);
app.get('/create', create);
app.get('/room', room);
app.get('/room/:roomName', roomName);
app.all('/playlist/*', require('./routes/playlist')(io));
// app.get('/playlist/*', playlist);
app.get('/createRoom', createRoom);
app.get('/joinRoom', joinRoom);
app.get('/isHost', isHost);
app.use(bodyParser.json()); // support json encoded bodies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

