var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SongConstants = require('../constants/SongConstants');

var _songs = [];
var _songIds = [];

var CHANGE_EVENT = "change";

function create(song) {
	console.log(song);
	if (song) {
		if (song.id && _songIds.indexOf(song.id) === -1) {
			_songIds.push(song.id);
			_songs.push({
				title:song.title,
				id:song.id,
				length:song.length
			});
		}
	}
}

function remove(song) {
	if (song) {
		if (song.id && _songIds.indexOf(song.id) !== -1) {
			_songIds.splice(_songIds.indexOf(song.id), 1);
			for (var i = 0; i < _songs.length; i++) {
				if (songs[i].id === song.id) {
					_songs.splice(i, 1);
					break;
				}
			}
		}
	}
}

var SongStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _songs;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case SongConstants.SONG_CREATE:
      	if (action.song) {
        	create(action.song);
        	SongStore.emitChange();
      	}
      	break;

    case SongConstants.SONG_REMOVE:
    	if (action.song) {
    		remove(song);
    		SongStore.emitChange();
    	}
    	break;

    default:
      // no op
  }
});

module.exports = SongStore;