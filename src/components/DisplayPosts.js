import React, { Component } from 'react';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import * as graphql from '../graphql/queries';
import { onCreatePost, onDeletePost, onUpdatePost, onCreateComment, onCreateLike } from '../graphql/subscriptions';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import CreateCommentPost from './CreateCommentPost';
import CommentPost from './CommentPost';
import { FaThumbsUp, FaSadTear } from 'react-icons/fa';
import { createPost, createLike } from '../graphql/mutations';
import UserWhoLikedPost from './UserWhoLikedPost';

class DisplayPosts extends Component {
	state = {
		ownerId: '',
		ownerUsername: '',
		isHovering: false,
		errorMessage: '',
		postLikedBy: [],
		posts: []
	};
	async componentDidMount() {
		this._getPosts();

		await Auth.currentUserInfo().then((user) => {
			this.setState({
				ownerId: user.attributes.sub,
				ownerUsername: user.username
			});
		});

		this._createPostListener = API.graphql(graphqlOperation(onCreatePost)).subscribe({
			next: (postData) => {
				const newPost = postData.value.data.onCreatePost;
				const prevPosts = this.state.posts.filter((post) => post.id !== newPost.id);
				const updatePosts = [ newPost, ...prevPosts ];

				this.setState({ posts: updatePosts });
			}
		});

		this._deletePostListener = API.graphql(graphqlOperation(onDeletePost)).subscribe({
			next: (postData) => {
				const deletedPost = postData.value.data.onDeletePost;
				const updatePosts = this.state.posts.filter((post) => post.id !== deletedPost.id);

				this.setState({ posts: updatePosts });
			}
		});

		this._updatePostListener = API.graphql(graphqlOperation(onUpdatePost)).subscribe({
			next: (postData) => {
				const { posts } = this.state;
				const updatePost = postData.value.data.onUpdatePost;
				const index = posts.findIndex((post) => post.id === updatePost.id);
				const updatePosts = [ ...posts.slice(0, index), updatePost, ...posts.slice(index + 1) ];

				this.setState({ posts: updatePosts });
			}
		});

		this._createPostCommentListener = API.graphql(graphqlOperation(onCreateComment)).subscribe({
			next: (commentData) => {
				const createdComment = commentData.value.data.onCreateComment;
				const posts = [ ...this.state.posts ];

				for (let post of posts) {
					if (createdComment.post.id === post.id) {
						post.comments.items.push(createdComment);
						console.log('test ', post);
					}
				}

				this.setState({ posts });
			}
		});

		this._createPostLikeListener = API.graphql(graphqlOperation(onCreateLike)).subscribe({
			next: (LikeData) => {
				const createdLike = LikeData.value.data.onCreateLike;
				let posts = [ ...this.state.posts ];

				for (let post of posts) {
					if (createdLike.post.id === post.id) {
						post.likes.items.push(createdLike);
					}
				}
				this.setState({ posts });
			}
		});
	}

	componentWillUnmount() {
		this._createPostListener.unsubscribe();
		this._deletePostListener.unsubscribe();
		this._updatePostListener.unsubscribe();
		this._createPostCommentListener.unsubscribe();
		this._createPostLikeListener.unsubscribe();
	}

	_getPosts = async () => {
		const result = await API.graphql(graphqlOperation(graphql.listPosts));
		// console.log('result ', JSON.stringify(result.data.listPosts.items));

		const { items } = result.data.listPosts;
		this.setState({
			posts: items
		});
		console.log('result ', items);
	};

	_likedPost = (postId) => {
		for (let post of this.state.posts) {
			if (post.id === postId) {
				if (post.postOwnerId === this.state.ownerId) return true;
				for (let like of post.likes.items) {
					if (like.likeOwnerId === this.state.ownerId) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_handleLike = async (postId) => {
		if (this._likedPost(postId) === true) {
			return this.setState({ errorMessage: 'Can not like your own post' });
		} else {
			const input = {
				numberLikes: 1,
				likeOwnerId: this.state.ownerId,
				likeOwnerUsername: this.state.ownerUsername,
				likePostId: postId
			};

			try {
				const result = await API.graphql(graphqlOperation(createLike, { input }));
				console.log(result.data);
			} catch (error) {
				console.log(error);
			}
		}
	};

	_handleMouseHover = async (postId) => {
		this.setState({ isHovering: !this.state.isHovering });

		let innerLikes = this.state.postLikedBy;

		for (let post of this.state.posts) {
			if (post.id === postId) {
				for (let like of post.likes.items) {
					innerLikes.push(like.likeOwnerUsername);
				}
			}
		}

		this.setState({ postLikedBy: innerLikes });

		console.log(this.state.postLikedBy);
	};

	_handleMouseHoverLeave = async () => {
		this.setState({ isHovering: !this.state.isHovering });
		this.setState({ postLikedBy: [] });
	};

	render() {
		const { posts, ownerId } = this.state;
		let loggedInUser = ownerId;
		return posts.map((post) => (
			<div key={post.id} className="posts" style={styles}>
				<h1>{post.postTitle}</h1>
				<span style={{ fontStyle: 'italic', color: '#0ca5e297' }}>
					{'Wrote by: '} {post.postOwnerUserName}
					{' on '}
					<time style={{ fontStyle: 'italic', color: '#0ca5e297' }}>
						{new Date(post.createdAt).toDateString()}
					</time>
				</span>
				<p>{post.postBody}</p>
				<span>
					{post.postOwnerId === loggedInUser && <EditPost {...post} />}
					{post.postOwnerId === loggedInUser && <DeletePost data={post} />}

					<span>
						<p className="alert">{post.postOwnerId === loggedInUser && this.state.errorMessage}</p>

						<p
							onMouseLeave={() => this._handleMouseHoverLeave()}
							onMouseEnter={() => this._handleMouseHover(post.id)}
							onClick={() => this._handleLike(post.id)}
							style={{ color: post.likes.items.length > 0 ? 'blue' : 'grey' }}
							className="style-button"
						>
							<FaThumbsUp />
							{post.likes.items.length}
						</p>
						{this.state.isHovering && (
							<div className="users-liked">
								{this.state.postLikedBy.length === 0 ? 'No one liked this post' : 'Liked by: '}
								{this.state.postLikedBy.length === 0 ? (
									<FaSadTear />
								) : (
									<UserWhoLikedPost data={this.state.postLikedBy} />
								)}
							</div>
						)}
					</span>
				</span>
				<span>
					<CreateCommentPost postId={post.id} />
					{post.comments.items.length > 0 && (
						<span style={{ fontSize: '19px', color: 'grey' }}> Comment: </span>
					)}
					{post.comments.items.map((comment, index) => <CommentPost key={index} commentData={comment} />)}
				</span>
			</div>
		));
	}
}

const styles = {
	background: '#f4f4f4',
	padding: '10px',
	border: '1px #ccc dotted',
	margin: '14px'
};

export default DisplayPosts;
