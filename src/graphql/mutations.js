/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
    id
    postOwnerId
    postOwnerUserName
    postTitle
    postBody
    createdAt
    comments {
      items {
        id
        commentOwnerId
        commentOwnerUsername
        content
        createdAt
      }
      nextToken
    }
    likes {
      items {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
      }
      nextToken
    }
  }
}
`;
export const updatePost = `mutation UpdatePost(
  $input: UpdatePostInput!
  $condition: ModelPostConditionInput
) {
  updatePost(input: $input, condition: $condition) {
    id
    postOwnerId
    postOwnerUserName
    postTitle
    postBody
    createdAt
    comments {
      items {
        id
        commentOwnerId
        commentOwnerUsername
        content
        createdAt
      }
      nextToken
    }
    likes {
      items {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
      }
      nextToken
    }
  }
}
`;
export const deletePost = `mutation DeletePost(
  $input: DeletePostInput!
  $condition: ModelPostConditionInput
) {
  deletePost(input: $input, condition: $condition) {
    id
    postOwnerId
    postOwnerUserName
    postTitle
    postBody
    createdAt
    comments {
      items {
        id
        commentOwnerId
        commentOwnerUsername
        content
        createdAt
      }
      nextToken
    }
    likes {
      items {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
      }
      nextToken
    }
  }
}
`;
export const createComment = `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
    id
    commentOwnerId
    commentOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUserName
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
    content
    createdAt
  }
}
`;
export const updateComment = `mutation UpdateComment(
  $input: UpdateCommentInput!
  $condition: ModelCommentConditionInput
) {
  updateComment(input: $input, condition: $condition) {
    id
    commentOwnerId
    commentOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUserName
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
    content
    createdAt
  }
}
`;
export const deleteComment = `mutation DeleteComment(
  $input: DeleteCommentInput!
  $condition: ModelCommentConditionInput
) {
  deleteComment(input: $input, condition: $condition) {
    id
    commentOwnerId
    commentOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUserName
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
    content
    createdAt
  }
}
`;
export const createLike = `mutation CreateLike(
  $input: CreateLikeInput!
  $condition: ModelLikeConditionInput
) {
  createLike(input: $input, condition: $condition) {
    id
    numberLikes
    likeOwnerId
    likeOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUserName
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
  }
}
`;
export const updateLike = `mutation UpdateLike(
  $input: UpdateLikeInput!
  $condition: ModelLikeConditionInput
) {
  updateLike(input: $input, condition: $condition) {
    id
    numberLikes
    likeOwnerId
    likeOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUserName
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
  }
}
`;
export const deleteLike = `mutation DeleteLike(
  $input: DeleteLikeInput!
  $condition: ModelLikeConditionInput
) {
  deleteLike(input: $input, condition: $condition) {
    id
    numberLikes
    likeOwnerId
    likeOwnerUsername
    post {
      id
      postOwnerId
      postOwnerUserName
      postTitle
      postBody
      createdAt
      comments {
        nextToken
      }
      likes {
        nextToken
      }
    }
  }
}
`;
