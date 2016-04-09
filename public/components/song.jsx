var Song = React.createClass({
	displayName:'Song',
	render: function() {
		var anchor = null;
		if (this.props.onclick) {
			anchor = <div><a href="#" data-id={this.props.id} onClick={this.props.onclick}>+</a></div>;
		} else {
			anchor = <div><a className="upVote" href="#" data-id={this.props.id} onClick={this.props.upVote}>+</a><a className="downVote" href="#" data-id={this.props.id} onClick={this.props.downVote}>-</a></div>;
		}
		return (
				<div>
					<div className="image_box">
						<img className="channel_thumbnail" src={this.props.image}/>
					</div>
					<div className="text_box">
						<p className="channel_title">{this.props.title}</p>
						<p className="channel_name">{this.props.channel}</p>
						{anchor}
					</div>
				</div>
			)
	}
});