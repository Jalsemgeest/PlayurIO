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
		e.preventDefault();
		var id = e.target.dataset['id'];
		PlaylistActions.upvote(id);
	},
	downVote:function(e) {
		e.preventDefault();
		var id = e.target.dataset['id'];
		PlaylistActions.downvote(id);
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
				return (<li key={id}>
							<Song image={item.img}
								title={item.title}
								channel={item.channel}
								id={id}
								votes={item.votes}
								voteUp={self.upVote}
								voteDown={self.downVote} />
					</li>)
			});
		}
		return (
				<div>
					<div style={isVisible} className="menu_content">
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