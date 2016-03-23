var Navbar = React.createClass({
	displayName:'Navbar',
	login: function login(e) {
		e.preventDefault();
		
	},
	logout:function logout(e) {
		e.preventDefault();
		console.log('Logout ' + this.props.username);
	},
	render: function() {
		var username = this.props.username;
		var loginOrOut = username.length === 0 ? React.createElement("li", null, React.createElement("a", {href: "login", onClick: this.login}, "Login")) : React.createElement("li", null, React.createElement("a", {href: "logout", onClick: this.logout}, "Logout"))
		return (
			React.createElement("nav", {className: "nav-top"}, 
				React.createElement("div", {className: "container"}, 
					React.createElement("ul", null, 
						React.createElement("li", null, React.createElement("a", {href: "about"}, "About")), 
						loginOrOut
					)
				)
			)
		)
	}
});
var LoginForm = React.createClass({
	displayName:'LoginForm',
	getInitialState: function (){
		return {
			roomkey:''
		};
	},
	create: function create() {
		var self = this;
		$.get('/create', function(data) {
			var words = data.roomkey[0].map(function(word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			});

			self.setState({roomkey:words.join().replace(/,/g, '')});
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
	      	React.createElement(Navbar, {username: this.state.username, userId: this.state.userId}), 
	      		"Hello World!", 
	        React.createElement(LoginForm, null)
        )
    )
  }
});

React.render(React.createElement(HelloWorld, null), document.getElementById('app'));