var express = require('express');
var path = require('path');
var Auth = require('../controllers/Auth');
var randomwords = require('random-words');
var cookieParser = require('cookie-parser');
var Redis = require('../controllers/RedisHelper');
var Helper = require('../controllers/HelperFunctions');
var bodyParser = require('body-parser');

module.exports = function(client) {
'use strict';
	client.on('connection', function(socket) {
		var room = Helper.getRoomCookie(socket.handshake.headers.cookie);
		var hash = Helper.getHashCookie(socket.handshake.headers.cookie);
		var uuid = Helper.getUUID(socket.handshake.headers.cookie, room);
		socket.join(room);

		// Playlist request.
		socket.on('request playlist', function() {
			Redis.getAllFromKey(room, function(err, reply) {
				socket.emit('playlist return', reply);
			});
		});	

		socket.on('request next song', function() {
			if (hash) {
				Auth.verifyHash(hash, room, function(isValid) {
					if (isValid) {
						Redis.nextSong(room, function() {
							socket.emit('next song return');
							socket.to(room).emit('next song return');
						});
					}
				});
			}
		});

		socket.on('request add song', function(song) {
			if (room !== '' && song) {
				song.votes = [];
				Redis.addSong(room, song, function(playlist) {
					socket.emit('add song return', playlist);
					socket.to(room).emit('add song return', playlist);
				});
			} else {
				socket.emit('error');
			}
		});

		socket.on('request upvote song', function(song) {
			console.log(song);
			console.log(socket.handshake.headers.cookie);

			console.log(uuid);
			if (uuid) {
				Redis.getAllFromKey(room, function(err, reply) {
					if (!err) {
						var index = -1;
						var songs = null;
						for (var i = 0; i < reply.length; i++) {
							songs = JSON.parse(reply[i]);
							if (songs.id === song.id) {
								index = i;
								break;
							}
						}
						var found = false;
						for (var i = 0; i < songs.votes.length; i++) {
							if (songs.votes[i].id === uuid) {
								if (songs.votes.vote === "up") {
									found = true;
								} else {
									songs.votes.splice(i, 1);
								}
								break;
							}
						}
						if (!found) {
							songs.votes.push({vote: 'up', id:uuid});
							Redis.setIndex(room, index, songs, function(err, reply) {
								Redis.getAllFromKey(room, function(err, reply) {
									socket.emit('upvote song return', reply);
									socket.to(room).emit('playlist return', reply);
								});
							});
						} else {
							socket.emit('upvote song return', {error: "Song not found."});
						}
						
					} else {
						socket.emit('upvote song return', {error: "Error getting playlist."});
					}
				});
			}
		});

		socket.on('request downvote song', function(song) {
			if (uuid) {
				Redis.getAllFromKey(room, function(err, reply) {
					if (!err) {
						var index = -1;
						var songs = null;
						for (var i = 0; i < reply.length; i++) {
							songs = JSON.parse(reply[i]);
							if (songs.id === song.id) {
								index = i;
								break;
							}
						}
						var found = false;
						for (var i = 0; i < songs.votes.length; i++) {
							if (songs.votes[i].id === uuid) {
								if (songs.votes.vote === "down") {
									found = true;
								} else {
									songs.votes.splice(i, 1);
								}
								break;
							}
						}
						if (!found) {
							songs.votes.push({vote: 'down', id:uuid});
							Redis.setIndex(room, index, songs, function(err, reply) {
								Redis.getAllFromKey(room, function(err, reply) {
									socket.emit('downvote song return', reply);
									socket.to(room).emit('playlist return', reply);
								});
							});
						} else {
							socket.emit('downvote song return', {error: "Error getting playlist."});
						}
						
					} else {
						socket.emit('downvote song return', {error: "Error getting playlist."});
					}
				});
			}
		});
	});



	var router = express.Router();

	router.use(cookieParser());
	router.use(bodyParser());

	// router.post('/playlist/addsong', function(req, res) {

	// 		var room = req.cookies.roomName || '';
	// 		// console.log(req.param(data));
	// 		var song = req.body;
	// 		if (room !== '' && song) {
	// 			song.votes = [];
	// 			Redis.addSong(room, song, function() {
	// 				res.send({
	// 					success:'Song added successfully'
	// 				});
	// 			});
	// 		} else {
	// 			res.send({
	// 				error:'Invalid room name.'
	// 			});
	// 		}
	// });

	// router.post('/playlist/playNextSong', function(req, res) {
	// 	console.log(req.cookies);
	// 	var hash = req.cookies.roomHash;
	// 	var room = req.cookies.roomName;

	// 	if (hash) {
	// 		console.log("Hash is okay.");
	// 		// verifyHash: function(oldHash, room, callback)
	// 		Auth.verifyHash(hash, room, function(isValid) {
	// 			if (isValid) {
	// 				console.log("Worked?");
	// 				Redis.nextSong(room, function() {
	// 					console.log("Should have deleted.");
	// 					res.send({
	// 						success:true
	// 					});
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		res.send({
	// 			error:"Invalid hash."
	// 		})
	// 	}
	// });

	// router.get('/playlist/getPlaylist', function(req, res) {
	// 	var room = req.cookies.roomName || '';
	// 	// console.log(room);
	// 	// console.log(req.cookies);
	// 	if (room !== '') {
	// 		Redis.getAllFromKey(room, function(err, reply) {
	// 			// console.log(err);
	// 			// console.log(reply);
	// 			res.send(reply);
	// 		});
	// 	} else {
	// 		res.send({
	// 			error:'Invalid room name.'
	// 		});
	// 	}
	// });

	router.post('/playlist/upvote', function(req, res) {
		var room = req.cookies.roomName || '';
		var voting = req.cookies[room+"-Voting"];
		if (room !== '') {
			Redis.getAllFromKey(room, function(err, reply) {
				if (!err) {
					var song = req.body;
					console.log(reply);
					var index = -1;
					var songs = null;
					for (var i = 0; i < reply.length; i++) {
						songs = JSON.parse(reply[i]);
						if (songs.id === song.id) {
							index = i;
							break;
						}
					}
					var found = false;
					for (var i = 0; i < songs.votes.length; i++) {
						if (songs.votes[i].id === voting) {
							if (songs.votes.vote === "up") {
								found = true;
							} else {
								songs.votes.splice(i, 1);
							}
							break;
						}
					}
					if (!found) {
						// console.log("INDEX");
						// console.log(index);
						songs.votes.push({vote: 'up', id:voting});
						Redis.setIndex(room, index, songs, function(err, reply) {
							Redis.getAllFromKey(room, function(err, reply) {
								console.log(reply);
								res.send(reply);
							});
						});
					} else {
						res.send(reply);
					}
					
				} else {
					res.send({
						error:"Failed to find room"
					});
				}
			});
		} else {
			res.send({
				error:'Invalid room name.'
			});
		}
	});

	router.post('/playlist/downvote', function(req, res) {
		var room = req.cookies.roomName || '';
		var voting = req.cookies[room+"-Voting"];
		if (room !== '') {
			Redis.getAllFromKey(room, function(err, reply) {
				if (!err) {
					console.log(reply);
					var index = -1;
					var song = req.body;
					var songs = null;
					for (var i = 0; i < reply.length; i++) {
						songs = JSON.parse(reply[i]);
						if (songs.id === song.id) {
							index = i;
							break;
						}
					}
					var found = false;
					for (var i = 0; i < songs.votes.length; i++) {
						if (songs.votes[i].id === voting) {
							if (songs.votes.vote === "down") {
								found = true;
							} else {
								songs.votes.splice(i, 1);
							}
							break;
						}
					}
					if (!found) {
						songs.votes.push({vote: 'down', id:voting});
						Redis.setIndex(room, index, songs, function(err, reply) {
							Redis.getAllFromKey(room, function(err, reply) {
								console.log(reply);
								res.send(reply);
							});
						});
					} else {
						res.send(reply);
					}
					
				} else {
					res.send({
						error:"Failed to find room"
					});
				}
			});
		} else {
			res.send({
				error:'Invalid room name.'
			});
		}
	});	

	
	return router;

};