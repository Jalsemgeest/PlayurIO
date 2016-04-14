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
					<p>Playur allows you to create a YouTube playlist that other people can add to!</p>
					<p>Just create a room and give your friends the <i>key</i> and they can join!</p>
					<a className="create_room" href="/createRoom" >Create Room</a>
					<p>Or join a room with a friends key!</p>
					<input className="join_room_input" value={this.state.joiningKey} onChange={this.enteredKey} type="text"/>
					<a className="join_room" href={"/joinRoom?key="+ this.state.joiningKey} >Join Room</a>
				</div>
			)
	}
});