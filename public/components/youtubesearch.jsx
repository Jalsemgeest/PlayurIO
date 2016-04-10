var PlaylistActions = require('../actions/PlaylistActions');

var ENTER_KEY = 13;

function getResults() {
	return PlaylistStore.getSearchResults();	
}

var YouTubeSearch = React.createClass({
	displayName:'YouTubeSearch',
	getInitialState: function() {
		return {
			search: '',
			results:[]
		}
	},
	searchChange: function(e) {
		this.setState({
			search:e.target.value
		});
	},
	searchYouTube: function(e) {
		if (e.which === ENTER_KEY) {
			PlaylistActions.search(this.state.search);
		}
	},
	_onChange: function() {
		console.log("CHANGED");
		this.setState({
			results:getResults()
		});
	},
	componentDidMount: function() {
		PlaylistStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		PlaylistStore.removeChangeListener();
	},
	removeListItem: function(item) {
		if (item.nodeName === "LI") {
			item.remove();
		} else {
			this.removeListItem(item.parentNode);
		}
	},
	addSong:function(e) {
		e.preventDefault();
		if (e.target && e.target.dataset && e.target.dataset.id) {
			PlaylistActions.addSongById(e.target.dataset.id);
			this.removeListItem(e.target);
		}
	},
	render: function() {
		var isVisible = {
			display:'block'
		}
		if (this.props && this.props.selected !== 'youtube') {
			isVisible.display = 'none';
		}
		var searchResults = null;
		var self = this;
		if (this.state && this.state.results && this.state.results.length > 0) {
			searchResults = this.state.results.map(function(item) {
				var id = item.id.videoId;
				return (<li>
							<Song image={item.snippet.thumbnails.default.url}
								title={item.snippet.title}
								channel={item.snippet.channelTitle}
								id={id}
								onclick={self.addSong} />
						</li>)

			});
		}
		return (
				<div style={isVisible} className="menu_content">
					<input type="text" 
						value={this.state.search} 
						onChange={this.searchChange} 
						onKeyUp={this.searchYouTube} />
					<div className="youtubeResults">
						<ul>
							{searchResults}
						</ul>
					</div>
				</div>
			)
	}
});