var PlaylistActions = require('../actions/PlaylistActions');

function getHistory() {
	return PlaylistStore.getHistory();	
}

var History = React.createClass({
	displayName:'History',
	getInitialState: function() {
		return {
			history:[]
		}
	},
	_onChange: function() {
		this.setState({
			history:getHistory()
		});
	},
	componentDidMount: function() {
		PlaylistStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		PlaylistStore.removeChangeListener();
	},
	render: function() {
		var isVisible = {
			display:'block'
		}
		if (this.props && this.props.selected !== 'history') {
			isVisible.display = 'none';
		}
		var history = null;
		if (this.state && this.state.history) {
			playlist = this.state.history.map(function(item) {
				var id = item.id;
				return (<li>
							<Song image={item.img}
								title={item.title}
								channel={item.channel}
								id={id} />
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