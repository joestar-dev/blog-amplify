import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deletePost } from '../graphql/mutations';

class DeletePost extends Component {
	constructor(props) {
		super(props);
	}

	_handleDeletePost = async (postId) => {
		const input = {
			id: postId
		};

		await API.graphql(graphqlOperation(deletePost, { input }));
	};

	render() {
		const { id } = this.props.data;

		return <button onClick={() => this._handleDeletePost(id)}>delete</button>;
	}
}

export default DeletePost;
