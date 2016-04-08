var SongActions = require('../actions/SongActions');

function getDefaultVideo() {
	return {
		id:'09R8_2nJtjg',
		title:'Sugar - Maroon 5',
		length:300
	}
}

function getSongs() {
	return {
		songs:SongStore.getAll()
	}
}

var VideoPlayur = React.createClass({
	displayName:'VideoPlayur',
	getInitialState: function() {
		return {
			key:getParameterByName('auth'),
			title:'',
			id:'',
			length:0,
			player:null
		}
	},
	startVideos: function() {
		// SongActions.create(getDefaultVideo());	
		if (this.state.player && this.state.songs && this.state.songs.length > 0) {
			this.state.player.loadVideoById(this.state.songs[0].id);
		}
	},
	_onChange: function() {
		this.setState(getSongs());
	},
	componentDidMount: function() {
		SongStore.addChangeListener(this._onChange);
		SongActions.create(getDefaultVideo());
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
		this.state.player = new YT.Player('player', {
			playerVars: { 'rel': 0 },
	        width: 300,
	        height: 200,
	        events: {
	            'onReady': onPlayerReady,
	            'onStateChange': onPlayerStateChange
	        }
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
      	}
	},

	playurReady: function(event) {
		this.startVideos();

		console.log("Ready");
	},

	render: function() {
		return (
				<div className="video-table">
					<div className="video-container">
						<div id="player"></div>
					</div>
				</div>
			)
	}
});