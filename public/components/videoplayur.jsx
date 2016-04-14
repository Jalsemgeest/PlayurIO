var PlaylistActions = require('../actions/PlaylistActions');

function getDefaultVideo() {
	return {
		id:'09R8_2nJtjg',
		title:'Sugar - Maroon 5',
		length:300
	}
}

function getSongs() {
	return {
		songs:PlaylistStore.getAll()
	}
}

var VideoPlayur = React.createClass({
	displayName:'VideoPlayur',
	getInitialState: function() {
		return {
			songs:[]
		}
	},
	startVideos: function() {
		// SongActions.create(getDefaultVideo());	
		if (this.state.player && this.state.songs && this.state.songs.length > 0) {
			this.state.player.loadVideoById(this.state.songs[0].id);
		}
	},
	_onChange: function() {
		// if (this.state && this.state.player && this.state.player.getPlayerState() !== 2 && this.state.player.getPlayerState() !== 2) {
			this.setState(getSongs());
		// }
	},
	componentDidMount: function() {
		PlaylistStore.addChangeListener(this._onChange);
		PlaylistActions.getCurrentPlaylist();
		var self = this;
	    var firstScriptTag = document.getElementsByTagName('script')[0];
	    if (firstScriptTag.src !== "https://www.youtube.com/iframe_api") {
	    	var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
	    	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	    	window.onYouTubeIframeAPIReady = this.YouTubeReady;

	    	window.onPlayerReady = this.playurReady;
		    window.onPlayerStateChange = this.playurStateChange;
	    }
	},

	YouTubeReady: function() {
		this.setState({
			player: new YT.Player('player', {
				playerVars: { 'rel': 0 },
		        width: 300,
		        height: 200,
		        events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		        }
			})
		});
	},

	playurStateChange: function(event) {
		if (event.data == YT.PlayerState.PAUSED) {
	        console.log("Paused");
	    }

	    if (event.data == YT.PlayerState.PLAYING) {
	        console.log("Playing");
	        // currentTime = setInterval(updateTime, 1000);
	    }

	    if (event.data == YT.PlayerState.ENDED) {
			// socket.emit('change video')
			PlaylistActions.getNextSong();
      	}
	},

	goToNextSong: function(e) {
		e.preventDefault();

		if (this.state && this.state.player) {
			this.state.player.stopVideo();
			this.state.player.clearVideo();
			PlaylistActions.getNextSong();
		}
	},

	playurReady: function(event) {
		PlaylistStore.setVideoPlayer(this.state.player);
		this.startVideos();

		console.log("Ready");
	},

	render: function() {
		if (this.state && this.state.player) {
			if (typeof this.state.player.getPlayerState === "function") {
				if (this.state.player.getPlayerState() !== 1 && this.state.player.getPlayerState() !== 2
					|| this.state.songs[0].id !== this.state.player.getVideoData().video_id) {
					var songs = this.state.songs;
					if (songs && songs.length > 0) {
						this.state.player.loadVideoById(songs[0].id);
					}
				}
			}
		}
		var roomCode = window.location.href;
		if (roomCode) {
			roomCode = roomCode.split('/');
			if (roomCode.length > 3) {
				roomCode = roomCode[4];
				if (roomCode.indexOf('?') !== -1) {
					var index = roomCode.indexOf('?');
					roomCode = roomCode.substring(0, index);
				}
			} else {
				roomCode = null;
			}
		}
		var roomInfo = null;
		if (roomCode) {
			roomInfo = <p className="room_code_wrapper">Room Code:<span className="room_code"> {roomCode}</span></p>;
		}
		return (
				<div className="video-table">
					<div className="video-container">
						<img className="playur_logo" src="../images/logo.png"/>
						{roomInfo}
						<div id="player"></div>
						<a className="next_button" href="#" onClick={this.goToNextSong}>Next Song</a>
					</div>
				</div>
			)
	}
});