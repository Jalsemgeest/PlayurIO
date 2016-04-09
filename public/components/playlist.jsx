var PlaylistActions = require('../actions/PlaylistActions');

function getPlaylist() {
	return PlaylistStore.getAll();	
}

var Playlist = React.createClass({
	displayName:'Playlist',
	getInitialState: function() {
		return {
			playlist:[]
		}
	},
	_onChange: function() {
		this.setState({
			playlist:getPlaylist()
		});
	},
	componentDidMount: function() {
		PlaylistStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		PlaylistStore.removeChangeListener();
	},
	upVote:function(e) {

	},
	downVote:function(e) {

	},
	render: function() {
		var isVisible = {
			display:'block'
		}
		if (this.props && this.props.selected !== 'playlist') {
			isVisible.display = 'none';
		}
		var self = this;
		var playlist = null;
		if (this.state && this.state.playlist) {
			playlist = this.state.playlist.map(function(item) {
				var id = item.id;
				return (<li>
							<Song image={item.img}
								title={item.title}
								channel={item.channel}
								id={id}
								voteUp={self.upVote}
								voteDown={self.downVote} />
					</li>)
			});
		}
		return (
				<div>
					<div style={isVisible} className="menu_content">
						<p>Playlist</p>
						<div className="playlist">
							<ul>
								{playlist}
							</ul>
						</div>
					</div>
				</div>
			)
	}
});