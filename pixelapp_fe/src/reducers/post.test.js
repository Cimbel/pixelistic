import reducer from './post';

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        error: false,
        errorMessage: '',
        successMessage: '' ,
        currentSessionPosts: [],
        wasLoadedFirstTime: false,
        isLoading: false
    })
  })

  it('should return isLoading true', () => {
    expect(reducer({ 
          error: false,
          isLoading: false 
        }, 
        { type: 'START_POST_PROCESSING' })
      )
      .toEqual({
        error: false,
        isLoading: true
     })
  })

  it('should return new post', () => {

    const state =  {
      error: false,
      errorMessage: '',
      successMessage: '',
      currentSessionPosts: [],
      isLoading: false
    }

    expect(reducer(state, { type: 'POST_ADD_SUCCESS', payload: 'new post' }))
    .toEqual({
      error: false,
      errorMessage: '',
      successMessage: 'Post added',
      currentSessionPosts: [ 'new post' ],
      isLoading: false
    })
  })

  it('should delete post', () => {

    const state =  {
      error: false,
      errorMessage: '',
      currentSessionPosts: [ {
        _id: 1,
        post: 'post'
      } ],
      isLoading: false
    }

    expect(reducer(state, { type: 'POST_REMOVE_SUCCESS', payload: 1 }))
    .toEqual({
      error: false,
      errorMessage: '',
      isLoading: false,
      currentSessionPosts: [ {
        _id: 1,
        post: 'post',
        deleted: true
      } ],
    })
  })

  it('should remove post from feedline', () => {

    const state =  {
      error: false,
      errorMessage: '',
      currentSessionPosts: [ {
        _id: 1,
        post: 'post',
        type: 'feed',
        author : { _id: 1 } 
      } ]
    }

    expect(reducer(state, { type: 'REMOVE_POSTS_FROM_FEEDLINE', payload: 1 }))
    .toEqual({
      error: false,
      errorMessage: '',
      currentSessionPosts: [ {
        _id: 1,
        post: 'post',
        author : { _id: 1 },
        type: ''
      } ]
    })
  })
})
