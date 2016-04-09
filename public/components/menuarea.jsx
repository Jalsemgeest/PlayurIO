var PlaylistActions = require('../actions/PlaylistActions');

function getPlaylist() {
	return PlaylistStore.getAll()
}

function getTabs() {
	return [
		"youtube",
		"playlist",
		"history"
		]
}

var MenuArea = React.createClass({
	displayName:'MenuArea',
	getInitialState: function() {
		return {
			tab: 'playlist',
			playlist:getPlaylist()
		}
	},

	changeTab: function(e) {
		e.preventDefault();
		this.setState({
			tab:e.target.parentNode.id
		});
	},

	render: function() {
		var self = this;
		var tabs = getTabs().map(function(val) {
			var isSelected = "";
			if (self.state && self.state.tab === val || (self.props.tab === val && !self.state.tab)) {
				isSelected = "selected";
			}
			return (<li id={val} ><a className={isSelected} ref={val} href="#" onClick={self.changeTab} >{val}</a></li>)
		});
		var selectedTab = this.props.tab;
		if (this.state && this.state.tab) {
			selectedTab = this.state.tab;
		}

		return (
				<div className="main_menu">
					<ul className="menu_tabs">
						{tabs}
					</ul>
					<div className="menu_container">
						<YouTubeSearch selected={selectedTab}/>
						<Playlist selected={selectedTab}/>
						<History selected={selectedTab}/>
					</div>
				</div>
			)
	}
});
