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
    		<div className="container">
    			<div className="center-container">
    				<div className="center-container-content">
						<h3>Welcome to Playur!</h3>
						<p>Playur allows you to create a YouTube playlist that other people can add to!</p>
						<p>Just create a room and give your friends the <i>key</i> and they can join!</p>
						<p>Or join a room with a friends key!</p>
			        	<CreateOrJoin />
		        	</div>
	        	</div>
        	</div>
        </div>
    )
  }
});

React.render(<HelloWorld />, document.getElementById('app'));