var PlaylistStore = require('../stores/PlaylistStore');

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getSelectedTab() {
	return PlaylistStore.getSelectedTab();
}

var Dashboard = React.createClass({
	displayName:'Dashboard',
	render: function() {
		return (
				<div className="dashboard">
					<div className="video-area">
						<VideoPlayur />
					</div>
					<div className="menu-area">
						<MenuArea 
							tab={getSelectedTab()}/>
					</div>
				</div>
			)
	}
});

React.render(<Dashboard />, document.getElementById('app'));