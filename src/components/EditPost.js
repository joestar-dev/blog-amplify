import React, { Component, Fragment } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { updatePost } from '../graphql/mutations';

class EditPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			id: '',
			postOwnerId: '',
			postOwnerUserName: '',
			postTitle: '',
			postBody: '',
			postData: {
				postTitle: this.props.postTitle,
				postBody: this.props.postBody
			}
		};
	}

	_toggleModal = () => {
		this.setState({ show: !this.state.show });

		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};

	UNSAFE_componentWillMount = async () => {
		await Auth.currentUserInfo().then((user) => {
			this.setState({
				postOwnerId: user.attributes.sub,
				postOwnerUserName: user.username
			});
		});
	};

	_handleTitle = (event) => {
		this.setState({ postData: { ...this.state.postData, postTitle: event.target.value } });
	};

	_handleBody = (event) => {
		this.setState({ postData: { ...this.state.postData, postBody: event.target.value } });
	};

	_handleUpdatePost = async (event) => {
		event.preventDefault();

		const input = {
			id: this.props.id,
			postOwnerId: this.state.postOwnerId,
			postOwnerUserName: this.state.postOwnerUserName,
			postTitle: this.state.postData.postTitle,
			postBody: this.state.postData.postBody
		};

		await API.graphql(graphqlOperation(updatePost, { input }));

		this.setState({ show: false });
	};

	render() {
		return (
			<Fragment>
				{this.state.show && (
					<div className="modal">
						<button className="close" onClick={this._toggleModal}>
							X
						</button>
						<form className="add-post" onSubmit={(event) => this._handleUpdatePost(event)}>
							<input
								style={{ fontSize: '19px' }}
								type="text"
								placeholder="Title"
								name="postTitle"
								value={this.state.postData.postTitle}
								onChange={this._handleTitle}
							/>
							<input
								style={{ height: '150px', fontSize: '19px' }}
								type="text"
								name="postBody"
								value={this.state.postData.postBody}
								onChange={this._handleBody}
							/>
							<button>Update Post</button>
						</form>
					</div>
				)}
				<button onClick={this._toggleModal}>Edit</button>
			</Fragment>
		);
	}
}

export default EditPost;
