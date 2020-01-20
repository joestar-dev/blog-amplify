import React, { Component } from 'react';

class UserWhoLikedPost extends Component {
	render() {
		const { data } = this.props;
		return data.map((user, i) => (
			<div key={i}>
				<span style={{ fontStyle: 'bold', color: '#ged' }}>{user}</span>
			</div>
		));
	}
}

export default UserWhoLikedPost;
