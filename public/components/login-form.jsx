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
		<div className='login-form'>
			<input type="text" onChange={this.create} placeholder="Waddup?"/>
			<p>{this.state.roomkey}</p>
		</div>
		)
	}
});