import reducer, { initialState } from './admin-page';

describe('admin-page reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should load all users', () => {
    expect(reducer(
      {
        ...initialState
      },
      {
        type: 'LOAD_USERS_SUCCESS',
        payload: [
          {
            _id: '0',
            nickname: 'Alex'
          },
          {
            _id: '1',
            nickname: 'Tom'
          },
          {
            _id: '2',
            nickname: 'Forest'
          }
        ]
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          _id: '0',
          nickname: 'Alex'
        },
        {
          _id: '1',
          nickname: 'Tom'
        },
        {
          _id: '2',
          nickname: 'Forest'
        }
      ]
    });
  });

  it('should handle error at loading users', () => {
    expect(reducer(
      {
        ...initialState
      },
      {
        type: 'LOAD_USERS_ERROR',
        payload: {
          response: {
            data: {
              error: 'loading users failed'
            }
          }
        }
      }
    )).toEqual(
      {
        users: null,
        error: true,
        errorMessage: 'loading users failed'
      }
    );
  });

  it("should update user's status", () => {
    expect(reducer(
      {
        ...initialState,
        users: [
          {
            _id: '0',
            nickname: 'Alex',
            isActive: true
          },
          {
            _id: '1',
            nickname: 'Tom',
            isActive: true 
          },
          {
            _id: '2',
            nickname: 'Forest',
            isActive: true 
          }
        ]
      },
      {
        type: 'USER_STATUS_UPDATED',
        payload: 
          {
            id: '1',
            status: false
          }
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          _id: '0',
          nickname: 'Alex',
          isActive: true
        },
        {
          _id: '1',
          nickname: 'Tom',
          isActive: false
        },
        {
          _id: '2',
          nickname: 'Forest',
          isActive: true
        }
      ]
    });
  });

  it('should handle error at updating user status', () => {
    expect(reducer(
      {
        ...initialState
      },
      {
        type: 'USER_STATUS_ERROR',
        payload: {
          response: {
            data: {
              error: 'status update failed'
            }
          }
        }
      }
    )).toEqual(
      {
        users: null,
        error: true,
        errorMessage: 'status update failed'
      }
    );
  });

  it("should disable user account", () => {
    expect(reducer(
      {
        ...initialState,
        users: [
          {
            _id: '0',
            nickname: 'Alex',
            disabled: false
          },
          {
            _id: '1',
            nickname: 'Tom',
            disabled: false 
          },
          {
            _id: '2',
            nickname: 'Forest',
            disabled: false 
          }
        ]
      },
      {
        type: 'DISABLE_USER_SUCCESS',
        payload: [
          {
            _id: '0',
            nickname: 'Alex',
            disabled: false
          },
          {
            _id: '1',
            nickname: 'Tom',
            disabled: true 
          },
          {
            _id: '2',
            nickname: 'Forest',
            disabled: false 
          }
        ] 
      }
    )).toEqual({
      ...initialState,
      users: [
        {
          _id: '0',
          nickname: 'Alex',
          disabled: false
        },
        {
          _id: '1',
          nickname: 'Tom',
          disabled: true 
        },
        {
          _id: '2',
          nickname: 'Forest',
          disabled: false 
        }
      ] 
    });
  });

  it('should handle error at disabling user account', () => {
    expect(reducer(
      {
        ...initialState
      },
      {
        type: 'DISABLE_USER_FAILURE',
        payload: {
          response: {
            data: {
              error: 'account disabling failed'
            }
          }
        }
      }
    )).toEqual(
      {
        users: null,
        error: true,
        errorMessage: 'account disabling failed'
      }
    );
  });

});
