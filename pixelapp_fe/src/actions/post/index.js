import { postApi } from '../../api/post-api';

export const postAddPost = (image, description, geolocation, user) => {
  return dispatch => {
    dispatch({type: 'START_POST_PROCESSING'});
    return postApi.addPost(image, description, geolocation, user).then( post => {
        dispatch({ type: 'POST_ADD_SUCCESS', payload: post });
      }, err => {    
        dispatch({ type: 'POST_ADD_ERROR', payload: err })
      });
  }
}

export const postSessionPosts = (user) => {
  return {type: 'CREATE_SESSION_POSTS', payload: user}
}

export const postAddPostsToSession = (posts) => {
  return {type: 'ADD_POST_TO_SESSION', payload: posts}
}

export const postClearPosts = () => {
  return { type: 'CLEAR_ALL_POSTS' } 
}

export const postLikeChange = (postId, userId, type) => {
  return dispatch => {
    return postApi.likePost(postId, userId, type).then( newLikes => {
        dispatch({ type: 'LIKES_CHANGED_SUCCESS', payload: newLikes });
      }, err => {    
        dispatch({ type: 'LIKES_CHANGED_ERROR', payload: err });
      });
  } 
}

export const postCommentAdd = (postId, userNickname, userAvatar, comment) => {
  return dispatch => {
    return postApi.commentPost(postId, userNickname, userAvatar, comment).then( newComments => {
        dispatch({ type: 'COMMENT_ADDED_SUCCESS', payload: newComments });
      }, err => {    
        dispatch({ type: 'COMMENT_ADDED_ERROR', payload: err });
      });
  } 
}

export const postAddToFeedLine = (userId) => {
  return { type: 'ADD_POSTS_TO_FEEDLINE', payload: userId };
}

export const postRemoveFromFeedLine = (userId) => {
  return { type: 'REMOVE_POSTS_FROM_FEEDLINE', payload: userId };
}

export const postRemovePost = (postId, userId, imagePath) => {
  return dispatch => {
    dispatch({type: 'START_POST_PROCESSING'});
    return postApi.removePost(postId, userId, imagePath).then( postId => {
        dispatch({ type: 'POST_REMOVE_SUCCESS', payload: postId });
      }, err => {    
        dispatch({ type: 'POST_REMOVE_ERROR', payload: err })
      });
  }
}
