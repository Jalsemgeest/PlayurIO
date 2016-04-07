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
				<div className="dashboard">
					<div className="video-area">
						<VideoPlayur />
					</div>
					<div className="menu-area">
					</div>
				</div>
			)
	}
});

React.render(<Dashboard />, document.getElementById('app'));