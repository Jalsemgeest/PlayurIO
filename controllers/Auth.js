var crypto = require('crypto');
var uuid = require('uuid');

module.exports = {

	constants: {
		secret: 'ACHRTHaveNothingToDoWithThis',
		saltRounds: 10
	},

	getUserKey: function(key, callback) {
		var hash = crypto.createHmac('sha256', this.constants.secret)
                   .update(key)
                   .digest('hex');

        callback(hash);
	},

	verifyHash: function(oldHash, room, callback) {
		this.getUserKey(room, function(newHash) {
			console.log("NEW vs OLD");
			console.log(oldHash);
			console.log(newHash);

			if (newHash === oldHash) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	getUserUUID: function() {
		return uuid.v1();
	}

}