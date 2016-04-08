var AppDispatcher = require('../dispatcher/AppDispatcher');
var SongConstants = require('../constants/SongConstants');

var SongActions = {

  /**
   * @param  {song} song
   */
  create: function(song) {
    AppDispatcher.dispatch({
      actionType: SongConstants.SONG_CREATE,
      song: song
    });
  },

  remove: function(song) {
  	AppDispatcher.dispatch({
  		actionType: SongConstants.SONG_REMOVE,
  		song: song
  	});
  }
};

module.exports = SongActions;