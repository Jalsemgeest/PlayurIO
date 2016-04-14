var redis = require('redis');
var hashing = require('./Auth');
module.exports = {

	getBasics: function(userId) {
		return {
			created:Date.now(),
			owner:userId
		}
	},

	deleteKey: function(key, callback) {
		var client = redis.createClient();
		client.del(key, function() {
			callback();
		});
	},

	// Callback is (err, reply)
	getAllFromKey: function(key, callback) {
		var client = redis.createClient();
		client.lrange(key, 0, -1, callback);
	},

	getRangeOfKey: function(key, start, end, callback) {
		var client = redis.createClient();
		client.lrange(key, start || 0, end || -1, callback);
	},

	createPlaylist: function(key, hash, callback) {
		var client = redis.createClient();
		var self = this;
		this.deleteKey(key, function() {
			var str = self.getBasics(hash);
			self.deleteKey(key+"-RoomInfo", function() {
				client.rpush([key+"-RoomInfo", JSON.stringify(str)], callback)
				client.expire(key+"-RoomInfo", 86400);
			});
		});
	},

	initPlaylist: function(key, callback) {
		var self = this;
		hashing.getUserKey(key, function(hash) {
			if (hash !== '') {
				self.createPlaylist(key, hash, function(err, reply) {
					console.log("THIS IS THE HASH THAT IS GOING TO BE SET");
					console.log(hash);
					callback(err, reply, hash);
				});
			} else {
				return null;
			}
		});
	},

	addToHistory: function(key, song, callback) {
		var self = this;
		var client = redis.createClient();
		client.rpush([key, song], function(err, reply) {
			callback();
		});
	},

	addSong: function(key, song, callback) {
		var self = this;
		this.getAllFromKey(key, function(err, songs) {
			var toReturn = songs;
			if (songs.length <= 50) {
				var found = false;
				for (var i = 0; i < songs.length; i++) {
					var songs = JSON.parse(songs[i]);
					if (songs.id === song.id) {
						found = true;
						break;
					}
				}
				if (!found) {
					var client = redis.createClient();
					client.rpush([key, JSON.stringify(song)], function(err, reply) {
						console.log(toReturn);
						toReturn.push(JSON.stringify(song));
						callback(toReturn);
					});
				}
			}
		});
	},

	removeSong: function(key, song, callback) {
		var self = this;
		var client = redis.createClient();

		client.lrem(key, 0, song, function(err, reply) {
			callback();
		});
	},

	nextSong: function(key, callback) {
		var self = this;
		this.getAllFromKey(key, function(err, songs) {
			var oldSong = songs[0];
			self.addToHistory(key+"-History", oldSong, function() {
				self.removeSong(key, oldSong, function() {
					self.getAllFromKey(key, function(err, songs) {
						callback();
					});
				});
			});
		});
	},

	setIndex: function(key, index, song, callback) {
		var self = this;
		var client = redis.createClient();
		client.lset(key, index, JSON.stringify(song), callback);
	}

	

}