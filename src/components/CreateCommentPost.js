import React, { Component } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createComment } from '../graphql/mutations';

class CreateCommentPost extends Component {
	state = {
		commentOwnerId: '',
		commentOwnerUsername: '',
		content: ''
	};

	componentWillMount = async () => {
		await Auth.currentUserInfo().then((user) => {
			this.setState({
				commentOwnerId: user.attributes.sub,
				commentOwnerUsername: user.username
			});
		});
	};

	_handleChangeContent = (event) => {
		this.setState({ content: event.target.value });
	};

	_handleAddComment = async (event) => {
		event.preventDefault();
		const { content, commentOwnerId, commentOwnerUsername } = this.state;
		const input = {
			commentPostId: this.props.postId,
			commentOwnerId: commentOwnerId,
			commentOwnerUsername: commentOwnerUsername,
			content: content,
			createdAt: new Date().toISOString()
		};

		await API.graphql(graphqlOperation(createComment, { input }));

		this.setState({ content: '' });
	};

	render() {
		return (
			<div>
				<form className="add-comment" onSubmit={this._handleAddComment}>
					<textarea
						type="text"
						name="content"
						rows="3"
						cols="40"
						required
						placeholder="Add Your Comment"
						value={this.state.content}
						onChange={this._handleChangeContent}
					/>
					<input type="submit" className="btn" style={{ fontSize: '19px' }} value="Add Comment" />
				</form>
			</div>
		);
	}
}

export default CreateCommentPost;
