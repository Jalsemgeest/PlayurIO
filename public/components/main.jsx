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
    	<div>
	      	<Navbar username={this.state.username} userId={this.state.userId} />
	      		Hello World!
	        <LoginForm />
        </div>
    )
  }
});

React.render(<HelloWorld />, document.getElementById('app'));