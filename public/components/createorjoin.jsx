var CreateOrJoin = React.createClass({
	displayName:'CreateOrJoin',
	getInitialState: function() {
		return {
			potentialChannel:'',
			joiningKey:''
		}
	},
	componentDidMount: function() {
		var self = this;
		$.get('/create', function(data) {
			var words = data.roomkey[0].map(function(word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			});

			self.setState({potentialChannel:words.join().replace(/,/g, '')});
		});
	},
	enteredKey: function(e) {
		this.setState({joiningKey:e.target.value});
	},
	createRoom: function(e) {
		e.preventDefault();
		console.log(this.state.potentialChannel);
		$.post('/createRoom');
	},
	joinRoom: function(e) {
		e.preventDefault();
		var roomKey = this.state.joiningKey;
		console.log(roomKey);
	},
	render: function() {
		return (
				<div>
					<a href="/createRoom" >Create Room</a>
					<input value={this.state.joiningKey} onChange={this.enteredKey} type="text"/>
					<a href="#" onClick={this.joinRoom}>Join Room</a>
				</div>
			)
	}
});