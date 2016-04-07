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
				React.createElement("div", null, 
					React.createElement("a", {href: "/createRoom"}, "Create Room"), 
					React.createElement("input", {value: this.state.joiningKey, onChange: this.enteredKey, type: "text"}), 
					React.createElement("a", {href: "#", onClick: this.joinRoom}, "Join Room")
				)
			)
	}
});
var LoginForm = React.createClass({
	displayName:'LoginForm',
	getInitialState: function (){
		return {
			roomkey:''
		}
	},
	create: function create() {
		$.get('/create', function(data) {
			var words = data.roomkey[0];
			this.state.roomkey = words.join();
		});
	},
	render: function() {
		return (
		React.createElement("div", {className: "login-form"}, 
			React.createElement("input", {type: "text", onChange: this.create, placeholder: "Waddup?"}), 
			React.createElement("p", null, this.state.roomkey)
		)
		)
	}
});
var HelloWorld = React.createClass({
	displayName:'HelloWorld',

	getInitialState: function() {
		return {
			userId: 0,
			username: ''
		}
	},

  render: function(){
    return (
    	React.createElement("div", null, 
    		React.createElement("div", {className: "container"}, 
    			React.createElement("div", {className: "center-container"}, 
    				React.createElement("div", {className: "center-container-content"}, 
						React.createElement("h3", null, "Welcome to Playur!"), 
						React.createElement("p", null, "Playur allows you to create a YouTube playlist that other people can add to!"), 
						React.createElement("p", null, "Just create a room and give your friends the ", React.createElement("i", null, "key"), " and they can join!"), 
						React.createElement("p", null, "Or join a room with a friends key!"), 
			        	React.createElement(CreateOrJoin, null)
		        	)
	        	)
        	)
        )
    )
  }
});

React.render(React.createElement(HelloWorld, null), document.getElementById('app'));