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
	getInitialState: function() {
		return {
			isHost:false
		}
	},
	componentWillMount: function() {
		var self = this;
		$.get('/isHost', function(data) {
			self.setState({
				isHost:data.hosting
			});
		});
	},
	componentDidMount: function() {
		
	},
	componentWillUnmount: function() {
	},
	render: function() {

		var hosting = null;
		if (this.state.isHost) {
			hosting = (<div className="video-area">
						<VideoPlayur />
					</div>);
		}
		var menuClass = this.state.isHost ? 'menu-area' : 'menu-area guest';
		return (
				<div className="dashboard">
					{hosting}
					<div className={menuClass}>
						<MenuArea 
							tab={getSelectedTab()}
							isGuest={!this.state.isHost}/>
					</div>
				</div>
			)
	}
});

ReactDOM.render(<Dashboard />, document.getElementById('app'));