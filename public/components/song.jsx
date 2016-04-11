var Song = React.createClass({
	displayName:'Song',
	render: function() {
		var anchor = null;
		if (this.props.onclick) {
			anchor = <div><a href="#" data-id={this.props.id} onClick={this.props.onclick}>+</a></div>;
		} else {
			anchor = <div><a className="upVote" href="#" data-id={this.props.id} onClick={this.props.voteUp}>+</a><a className="downVote" href="#" data-id={this.props.id} onClick={this.props.voteDown}>-</a></div>;
		}
		var votes = null;
		if (this.props.votes) {
			var votes = 0;
			for (var i = 0; i < this.props.votes.length; i++) {
				if (this.props.votes[i].vote === "up") {
					votes = votes + 1;
				} else {
					votes = votes - 1;
				}
			}
		}
		return (
				<div>
					<div className="image_box">
						<img className="channel_thumbnail" src={this.props.image}/>
					</div>
					<div className="text_box">
						<p className="channel_title">{this.props.title}</p>
						<p className="channel_name">{this.props.channel}</p>
						<p className="channel_total">{votes}</p>
						{anchor}
					</div>
				</div>
			)
	}
});