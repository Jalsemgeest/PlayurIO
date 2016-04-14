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
    					<div className="home_page">
	    					<img className="playur_logo" src="images/logo.png"/>
							<h3>Welcome to Playur!</h3>
				        	<CreateOrJoin />
			        	</div>
		        	</div>
	        	</div>
        	</div>
        </div>
    )
  }
});

ReactDOM.render(<HelloWorld />, document.getElementById('app'));