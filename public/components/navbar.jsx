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
		var loginOrOut = username.length === 0 ? <li><a href="login" onClick={this.login}>Login</a></li> : <li><a href="logout" onClick={this.logout}>Logout</a></li>
		return (
			<nav className="nav-top">
				<div className="container">
					<ul>
						<li><a href="about">About</a></li>
						{loginOrOut}
					</ul>
				</div>
			</nav>
		)
	}
});