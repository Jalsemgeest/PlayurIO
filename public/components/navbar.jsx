var Navbar = React.createClass({
	displayName:'Navbar',

	render: function() {
		var username = this.props.username;
		var loginOrOut = username.length ? <li><a href="login">Login</a></li> : <li><a href="logout">Logout</a></li>
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