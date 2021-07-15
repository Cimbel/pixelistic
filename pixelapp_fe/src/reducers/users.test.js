import reducer, { initialState } from './users';

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return loading=true', () => {
    expect(reducer(
      undefined,
      { type: 'LOADING' }
    )).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should follow user', () => {
    expect(reducer(
      {
        ...initialState,
        users: [
          {
            _id: '0'
          },
          {
            _id: '1'
          },
          {
            _id: '2'
          }
        ]
      },
      {
        type: 'FOLLOW_SUCCESS',
        payload: {
          followingId: '1',
          followingInfoId: '333',
          newMessages: 4,
          status: 'online'
        }
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          _id: '0'
        },
        {
          _id: '1',
          favorite: false,
          following: true,
          followingId: '1',
          followingInfoId: '333',
          newMessages: 4,
          status: 'online'
        },
        {
          _id: '2'
        }
      ]
    });
  });

  it('should unfollow user', () => {
    expect(reducer(
      {
        ...initialState,
        users: [
          {
            following: true,
            followingId: "1"
          }
        ]
      },
      {
        type: 'UNFOLLOW_SUCCESS',
        payload: "1"
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          following: false,
          followingId: "1"
        }
      ]
    });

    expect(reducer(
      {
        ...initialState,
        users: [
          {
            following: true,
            followingId: "111"
          },
          {
            following: false
          },
          {
            following: true,
            followingId: "243"
          }
        ]
      },
      {
        type: 'UNFOLLOW_SUCCESS',
        payload: "243"
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          following: true,
          followingId: "111"
        },
        {
          following: false
        },
        {
          following: false,
          followingId: "243"
        }
      ]
    });
  });

  it('should handle error', () => {
    expect(reducer(
      {
        ...initialState
      },
      {
        type: 'ERROR',
        payload: {
          response: {
            data: {
              error: 'here comes an err'
            }
          }
        }
      }
    )).toEqual(
      {
        ...initialState,
        error: true,
        errorMessage: 'here comes an err',
        successMsg: null
      }
    );
  })

  it('should clear error and messages', () => {
    expect(reducer(
      {
        ...initialState,
        error: true,
      errorMessage: 'some err Msg',
      successMsg: 'some success Msg'

      },
      {
        type: 'CLEAR_ERROR_AND_MESSAGES'
        
      }
    )).toEqual(
      {
        ...initialState,
        error: false,
      errorMessage: null,
      successMsg: null
      }
    );
  })
  it('should handle favorite', () => {
    expect(reducer(
      {
        ...initialState,
        users: [
          {
            followingInfoId: '0',
            favorite: true
          },
          {
            followingInfoId: '1',
            favorite: false
          },
          {
            followingInfoId: '2',
            favorite: false
          }
        ]
      },
      {
        type: 'HANDLE_FAVORITE_SUCCESS',
        payload: {
          followingInfoId: '2',
          checked: true
        }
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          followingInfoId: '0',
          favorite: true
        },
        {
          followingInfoId: '1',
          favorite: false
        },
        {
          followingInfoId: '2',
          favorite: true
        }
      ]
    });
  });

  it('should load current followings', () => {
    expect(reducer(
      {
        ...initialState
      },
      {
        type: 'LOAD_CURRENT_FOLLOWINGS',
        payload: {
          followings: [{
            status: 'online',
            avatar: 'link to avatar',
            nickname: 'johnDoe',
            fullName: 'John Doe',
            website: 'www',
            bio: 'biography',
            posts: [],
            _id: '2',
          }],
          followingsInfo: [
            {
              _id: '111',
              favorite: 'false',
              newMessages: 2
            }
          ]
        }
      }
    )).toEqual({
      ...initialState,
      users: [{
        status: 'online',
        avatar: 'link to avatar',
        nickname: 'johnDoe',
        fullName: 'John Doe',
        website: 'www',
        bio: 'biography',
        posts: [],
        followingInfoId: '111',
        _id: '2',
        following: true,
        favorite: 'false',
        newMessages: 2
      }]
    });
  });

  it('should clean users array', () => {
    expect(reducer(
      {
        ...initialState,
        users: ['a few objects inside']
      },
      { type: 'CLEAN_USERS_ARRAY' }
    )).toEqual({ ...initialState });
  });

  it('should change connection status', () => {
    expect(reducer(
      {
        ...initialState,
        users: [
          {
            followingId: '1',
            status: 'online',
            socketId: '123'
          },
          {
            followingId: '2',
            status: 'offline',
            socketId: 'offline'
          }
        ]
      },
      {
        type: 'STATUS_CONNECTION_CHANGE',
        payload: {
          userId: '1',
          status: 'offline',
          socketId: 'offline'
        }
      }
    )).toEqual(
      {
        ...initialState,
        users: [
          {
            followingId: '1',
            status: 'offline',
            socketId: 'offline'
          },
          {
            followingId: '2',
            status: 'offline',
            socketId: 'offline'
          }
        ]
      }
    );

    expect(reducer(
      {
        ...initialState,
        users: [
          {
            followingId: '1',
            status: 'online',
            socketId: '123'
          },
          {
            followingId: '2',
            status: 'offline',
            socketId: 'offline'
          }
        ]
      },
      {
        type: 'STATUS_CONNECTION_CHANGE',
        payload: {
          userId: '2',
          status: 'online',
          socketId: '456'
        }
      }
    )).toEqual(
      {
        ...initialState,
        users: [
          {
            followingId: '1',
            status: 'online',
            socketId: '123'
          },
          {
            followingId: '2',
            status: 'online',
            socketId: '456'
          }
        ]
      }
    );
  });

  it('should get profile and update', () => {
    expect(reducer(
      {
        ...initialState,
        users: [
          {
            _id: '0',
            bio: 'bio',
            website: 'website',
            fullName: 'fullName',
            avatar: 'avatar',
            nickname: 'nickname'
          },
          {
            _id: '1',
            bio: 'bio2',
            website: 'website2',
            fullName: 'fullName2',
            avatar: 'avatar2',
            nickname: 'nickname2'
          }
        ]
      },
      {
        type: 'GET_PROFILE_SUCCESS',
        payload: {
          _id: '1',
          bio: 'updated_bio',
          website: 'updated_website',
          fullName: 'updated_fullName',
          avatar: 'updated_avatar',
          nickname: 'updated_nickname'
        }
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          _id: '0',
          bio: 'bio',
          website: 'website',
          fullName: 'fullName',
          avatar: 'avatar',
          nickname: 'nickname'
        },
        {
          _id: '1',
          bio: 'updated_bio',
          website: 'updated_website',
          fullName: 'updated_fullName',
          avatar: 'updated_avatar',
          nickname: 'updated_nickname'
        }
      ]
    });
  });

  it('should get profile and add', () => {
    expect(reducer(
      {
        ...initialState,
        users: [
          {
            _id: '0',
            bio: 'bio',
            website: 'website',
            fullName: 'fullName',
            avatar: 'avatar',
            nickname: 'nickname'
          }
        ]
      },
      {
        type: 'GET_PROFILE_SUCCESS',
        payload: {
          _id: '1',
          bio: 'bio2',
          website: 'website2',
          fullName: 'fullName2',
          avatar: 'avatar2',
          nickname: 'nickname2'
        }
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          _id: '0',
          bio: 'bio',
          website: 'website',
          fullName: 'fullName',
          avatar: 'avatar',
          nickname: 'nickname'
        },
        {
          _id: '1',
          bio: 'bio2',
          website: 'website2',
          fullName: 'fullName2',
          avatar: 'avatar2',
          nickname: 'nickname2'
        }
      ]
    });
  });

  it('should update profile', () => {
    expect(reducer(
      {
        ...initialState,
        users: [
          {
            _id: '0',
            bio: 'bio',
            website: 'website',
            fullName: 'fullName',
            avatar: 'avatar',
            nickname: 'nickname'
          },
          {
            _id: '1',
            bio: 'bio2',
            website: 'website2',
            fullName: 'fullName2',
            avatar: 'avatar2',
            nickname: 'nickname2'
          }
        ]
      },
      {
        type: 'PROFILE_UPDATED_SUCCESS',
        payload: {
          _id: '1',
          bio: 'updated_bio',
          website: 'updated_website',
          fullName: 'updated_fullName',
          avatar: 'updated_avatar',
          nickname: 'updated_nickname'
        }
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          _id: '0',
          bio: 'bio',
          website: 'website',
          fullName: 'fullName',
          avatar: 'avatar',
          nickname: 'nickname'
        },
        {
          _id: '1',
          bio: 'updated_bio',
          website: 'updated_website',
          fullName: 'updated_fullName',
          avatar: 'updated_avatar',
          nickname: 'updated_nickname'
        }
      ]
    });
  });

  it('should change password error', () => {
    expect(reducer(
      {
        ...initialState
      },
      {
        type: 'CHANGE_PASSWORD',
        payload: 'here comes a msg'
      }
    )).toEqual(
      {
        ...initialState,
        error: false,
        errorMessage: null,
        successMsg: 'here comes a msg'
      }
    );
  })
});
