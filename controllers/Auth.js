var bcrypt = require('bcrypt');

module.exports = {

	constants: {
		secret: 'ACHRTHaveNothingToDoWithThis',
		saltRounds: 10
	},

	getUserKey: function(key, callback) {
		bcrypt.hash(key, this.constants.saltRounds, function(err, hash) {
			if (err) {
				console.log("ERROR - Password hash failed.");
				console.log(err);
				callback('');
			}
		  	callback(hash.replace(/[^\w\s]/gi, ''));
		});
	},

	verifyHash: function(oldHash, room, callback) {

		callback(bcrypt.compareSync(room, oldHash));

		// this.getUserKey(room, function(hash) {
		// 	console.log(hash);
		//     if (hash === oldHash) {
		//     	callback(true);
		//     }
		//     callback(false);
		// });
	}

}