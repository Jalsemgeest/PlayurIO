var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PlaylistConstants = require('../constants/PlaylistConstants');

// Playlist
var _playlist = [];
var _selectedTab = "playlist";
var _searchResults = null;
// Video Player
var _songs = [];
var _songIds = [];
var _player = null;

var youtubeApiKey = "AIzaSyDK5BdN8Xu3hMjhYBlhpPNHCejBQM-wOug";

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

function search(query, callback) {
	if (query) {
		var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(query) + '&type=video&maxResults=20&category=music&key=' + youtubeApiKey;

    var promise = $.get(url);

    promise.done(function(data) {
      callback(data);
    });
		
    promise.fail(function(err) {
      console.log(err);
      callback(null);
    });

	} else {
		callback(null);
	}
}

function addSongById(id, callback) {
  if (id) {
    var found = false;
    for (var i = 0; i < _playlist.length; i++) {
      if (_playlist[i].id === id) {
        found = true;
      }
      break;
    }
    if (!found && _searchResults && _searchResults.length > 0) {
      for (var i = 0; i < _searchResults.length; i++) {
        if (_searchResults[i].id.videoId === id) {
          _playlist.push({
            title:_searchResults[i].snippet.title,
            id:_searchResults[i].id.videoId,
            img:_searchResults[i].snippet.thumbnails.default.url,
            channel:_searchResults[i].snippet.channelTitle
          });
          callback(true);
          return;
        }
      }
    }
    callback(false);
  } else {
    callback(false);
  }
}

var PlaylistStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _playlist;
  },

  getSelectedTab: function() {
	  return _selectedTab;
  },

  getSearchResults: function() {
    return _searchResults;
  },

  setVideoPlayer: function(player) {
    _player = player;
  },

  setSelectedTab: function(tab) {
    _selectedTab = tab;
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
    case PlaylistConstants.SEARCH:
      	if (action.query) {
        	search(action.query, function(response) {
            if (response.items) {
              _searchResults = response.items;
            }
        		PlaylistStore.emitChange();
        	});
      	}
      	break;

    case PlaylistConstants.ADD_SONG_BY_ID:
      if (action.id) {
        addSongById(action.id, function(wasSuccessful) {
          PlaylistStore.emitChange();
        });
      }
      break;

    case PlaylistConstants.SONG_CREATE:
        if (action.song) {
          create(action.song);
          PlaylistStore.emitChange();
        }
      break;

    case PlaylistConstants.SONG_REMOVE:
      if (action.song) {
        remove(song);
        PlaylistStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = PlaylistStore;