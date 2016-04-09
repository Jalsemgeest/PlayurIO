var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlaylistConstants = require('../constants/PlaylistConstants');

var PlaylistActions = {

  /**
   * @param  {song} song
   */
  search: function(string) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.SEARCH,
      query: string
    });
  },
  addSongById: function(id) {
  	AppDispatcher.dispatch({
  		actionType: PlaylistConstants.ADD_SONG_BY_ID,
  		id: id
  	});
  },
  create: function(song) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.SONG_CREATE,
      song: song
    });
  },
  remove: function(song) {
    AppDispatcher.dispatch({
      actionType: PlaylistConstants.SONG_REMOVE,
      song: song
    });
  },

};

module.exports = PlaylistActions;