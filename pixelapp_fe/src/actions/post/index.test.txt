import mockStore from '../../__mocks__/redux-mock-store';
import mockAxios from '../../__mocks__/axios';
import { host, port } from '../../const/node-server-config';
import * as actions from './index';
const store = mockStore();

describe('getPosts actions', () => {

  beforeEach(() => {
   store.clearActions();
   mockAxios.mockClear();
  });

  it('shoud create an action to upload new post', async () => {

    const post = { 
      author: 'JesterMax', 
      description: 'photo',
      geolocation: 'Lviv', 
      image: 'img.png'
    }

    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: { post }
    }))
   
    const expectedActions = [
      { type: 'START_POST_PROCESSING' },
      { type: 'POST_ADD_SUCCESS', payload:  post }
    ];

    await store.dispatch(actions.postAddPost('img.png', 'photo', 'Lviv', 'JesterMax'));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
    `${host}:${port}/add-post`, { 
      data: { post }, 
      headers: "jest test", 
      method: "POST"
    });
  });

  it('shoud create an action to delete post', async () => {

    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: { postId: 1 }
    }))
   
    const expectedActions = [
      { type: 'START_POST_PROCESSING' },
      { type: 'POST_REMOVE_SUCCESS', payload:  1 }
    ];

    await store.dispatch(actions.postRemovePost(1, 1, 'img.png'));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
    `${host}:${port}/remove-post`, { 
      data: { 
        postId: 1, 
        userId: 1, 
        imagePath: 'img.png'
      }, 
      headers: "jest test", 
      method: "DELETE"
    });
  });

  it('shoud create an action to like post', async () => {

    const type = 'like';
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: { 
        newLikes: {
          _id: 1,
          likes: ['1']
        } 
      }
    }))
   
    const expectedActions = [{ 
      type: 'LIKES_CHANGED_SUCCESS', 
      payload: { 
        _id: 1,
        likes: [ '1' ]
      }  
    }];

    await store.dispatch(actions.postLikeChange(1, 1, type));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
    `${host}:${port}/${type}-post`, { 
      data: { 
        postId: 1 , 
        userId: 1
      }, 
      headers: "jest test", 
      method: "PATCH"
    });
  });

  it('shoud create an action to comment post', async () => {

    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: { 
        newComments: {
          _id: 1,
          author: 'Max',
          comment: 'My Comment'
        } 
      }
    }))
   
    const expectedActions = [{ 
      type: 'COMMENT_ADDED_SUCCESS', 
      payload: { 
        _id: 1,
        author: 'Max',
        comment: 'My Comment'
      }  
    }];

    await store.dispatch(actions.postCommentAdd(1, 'Max', 'My Comment'));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
    `${host}:${port}/comment-post`,  { 
      data: { 
        postId: 1, 
        userNickname: 'Max', 
        comment: 'My Comment'
      }, 
        headers: "jest test", 
        method: "PATCH"
      }
    );
  });

  it('should create an action to create initial session post', () => {
    const user  = { _id: 1, nickname: 'Max Jester' }
    const expectedAction = {
      type: 'CREATE_SESSION_POSTS',
      payload: user
    }
    expect(actions.postSessionPosts(user)).toEqual(expectedAction)
  })

  it('should create an action to add new post to  session', () => {
    const posts = [{
      _id: 1,
      image: '1.png'
    },
    {
      _id: 2,
      image: '2.png'
    }]

    const expectedAction = {
      type: 'ADD_POST_TO_SESSION',
      payload: posts
    }
    expect(actions.postAddPostsToSession(posts)).toEqual(expectedAction)
  })

  it('should create an action to clear all posts', () => {
    const expectedAction = {
      type: 'CLEAR_ALL_POSTS'
    }
    expect(actions.postClearPosts()).toEqual(expectedAction)
  })

  it('should create an action to add posts to feedline', () => {
    const userId = '12';
    const expectedAction = {
      type: 'ADD_POSTS_TO_FEEDLINE',
      payload: '12'
    }
    expect(actions.postAddToFeedLine(userId)).toEqual(expectedAction)
  })

  it('should create an action to remove posts from feedline', () => {
    const userId = '12';
    const expectedAction = {
      type: 'REMOVE_POSTS_FROM_FEEDLINE',
      payload: '12'
    }
    expect(actions.postRemoveFromFeedLine(userId)).toEqual(expectedAction)
  })
});
