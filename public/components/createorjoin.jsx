var CreateOrJoin = React.createClass({
	displayName:'CreateOrJoin',
	getInitialState: function() {
		return {
			potentialChannel:'',
			joiningKey:''
		}
	},
	enteredKey: function(e) {
		this.setState({joiningKey:e.target.value});
	},
	render: function() {
		return (
				<div>
					<a href="/createRoom" >Create Room</a>
					<input value={this.state.joiningKey} onChange={this.enteredKey} type="text"/>
					<a href={"/joinRoom?key="+ this.state.joiningKey} >Join Room</a>
				</div>
			)
	}
});