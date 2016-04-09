var PlaylistActions = require('../actions/PlaylistActions');

var History = React.createClass({
	displayName:'History',
	render: function() {
		var isVisible = {
			display:'block'
		}
		if (this.props && this.props.selected !== 'history') {
			isVisible.display = 'none';
		}
		return (
				<div style={isVisible} className="menu_content">
					<p>History</p>
				</div>
			)
	}
});