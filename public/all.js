var Navbar = React.createClass({
	displayName:'Navbar',

	render: function() {
		var username = this.props.username;
		var loginOrOut = username.length ? React.createElement("li", null, React.createElement("a", {href: "login"}, "Login")) : React.createElement("li", null, React.createElement("a", {href: "logout"}, "Logout"))
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

	render: function() {
		return (
		React.createElement("div", {className: "login-form"}, 
			React.createElement("input", {type: "text", placeholder: "Waddup?"})
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