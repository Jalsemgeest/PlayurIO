var redis = require('redis');
var hashing = require('./Auth');
module.exports = {

	getBasics: function(userId) {
		return {
			created:Date.now(),
			owner:userId,
			songs:[]
		}
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
		var str = this.getBasics(hash);
		client.rpush([key, JSON.stringify(str)], callback);
	},

	initPlaylist: function(key, callback) {
		var self = this;
		hashing.getUserKey(key, function(hash) {
			if (hash !== '') {
				self.createPlaylist(key, hash, function(err, reply) {
					callback(err, reply, hash);
				});
			} else {
				return null;
			}
		});

	}

	

}