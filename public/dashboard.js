function getDefaultVideo() {
	return {
		videoId:"09R8_2nJtjg"
	}
}

var VideoPlayur = React.createClass({
	displayName:'VideoPlayur',
	getInitialState: function() {
		return {
			key:getParameterByName('auth'),
			title:'',
			url:'',
			player:null
		}
	},
	startVideos: function() {
		if (this.state.player) {
			this.state.player.loadVideoById(getDefaultVideo().videoId);
		}
	},
	componentDidMount: function() {
		var self = this;
	    var firstScriptTag = document.getElementsByTagName('script')[0];
	    if (firstScriptTag.src !== "https://www.youtube.com/iframe_api") {
	    	var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
	    	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	    	window.onYouTubeIframeAPIReady = function() {
	    		self.state.player = new YT.Player('player', {
			        //   playerVars: { 'controls': 0, 'rel': 0 },
			          playerVars: { 'rel': 0 },
			          width: 300,
			          height: 200,
			          events: {
			              'onReady': onPlayerReady,
			              'onStateChange': onPlayerStateChange
			          }
			      });
	    	}

	    	window.onPlayerReady = function(event) {
		        // $videoPlayer = $('#player');
		       	self.startVideos();
		        // $volume.val(player.getVolume());
		        console.log("Ready");
		    }

		    window.onPlayerStateChange = function(event) {
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
		    }
	    }
	},
	render: function() {
		return (
				React.createElement("div", {className: "video-table"}, 
					React.createElement("div", {className: "video-container"}, 
						React.createElement("div", {id: "player"})
					)
				)
			)
	}
});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var Dashboard = React.createClass({
	displayName:'Dashboard',
	render: function() {
		return (
				React.createElement("div", {className: "dashboard"}, 
					React.createElement("div", {className: "video-area"}, 
						React.createElement(VideoPlayur, null)
					), 
					React.createElement("div", {className: "menu-area"}
					)
				)
			)
	}
});

React.render(React.createElement(Dashboard, null), document.getElementById('app'));