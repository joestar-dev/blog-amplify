import React, { Component } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createPost } from '../graphql/mutations';
import EditPost from './EditPost';

class CreatePost extends Component {
	state = {
		postOwnerId: '',
		postOwnerUserName: '',
		postTitle: '',
		postBody: ''
	};

	componentDidMount = async () => {
		await Auth.currentUserInfo().then((user) => {
			// console.log(user);
			// console.log(user.attributes.email);
			this.setState({
				postOwnerId: user.attributes.sub,
				postOwnerUserName: user.username
			});
		});
	};

	_handleAddPost = async (event) => {
		event.preventDefault();

		const input = {
			postOwnerId: this.state.postOwnerId,
			postOwnerUserName: this.state.postOwnerUserName,
			postTitle: this.state.postTitle,
			postBody: this.state.postBody,
			createdAt: new Date().toISOString()
		};
		await API.graphql(graphqlOperation(createPost, { input }));

		this.setState({
			postTitle: '',
			postBody: ''
		});
	};

	_handleChangePost = (event) => this.setState({ [event.target.name]: event.target.value });

	render() {
		return (
			<form className="add-post" onSubmit={this._handleAddPost}>
				<input
					style={{ font: '19px' }}
					placeholder="Title"
					type="text"
					name="postTitle"
					required
					value={this.state.postTitle}
					onChange={this._handleChangePost}
				/>
				<textarea
					type="text"
					name="postBody"
					cols="40"
					rows="3"
					placeholder="New Blog Post"
					required
					value={this.state.postBody}
					onChange={this._handleChangePost}
				/>
				<input type="submit" className="btn" style={{ fontSize: '19px' }} />
			</form>
		);
	}
}

export default CreatePost;
