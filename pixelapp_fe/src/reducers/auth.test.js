import reducer, { initialState } from './auth';

describe('auth reducer', () => {

  it('error message forgot email does not exist', () => {
    expect(reducer(
      {
        ...initialState
      },
        {
          type: 'FORGOT_EMAIL_DOESNOT_EXIST',
          payload: {
            response: {
              data: {
                error: 'error message'
              }
            }
          }
        }
    )).toEqual(
      {
        ...initialState,
        confMsg: null,
        error: true,
        forgotErrMsg: 'error message',
        user: null,
        isAuthorized: false
      }
    );
  })

  it('error message forgot token incorrect', () => {
    expect(reducer(
      {
        ...initialState
      },
        { 
          type: 'FORGOT_RESET_TOKEN_INCORRECT',
          payload: {
            response: {
              data: {
                error: 'error message'
              }
            }
          }
        }
    )).toEqual(
      {
        ...initialState,
        confMsg: null,
        error: true,
        forgotErrMsg: 'error message',
        user: null,
        isAuthorized: false
      }
    );
  })

  it('confirm message email exist', () => {
    expect(reducer(
      {
        ...initialState
      },
        {
          type: 'FORGOT_EMAIL_EXIST',
          payload: 'success message' 
        }
    )).toEqual(
      {
        ...initialState,
        error: false,
        errorMessage: null,
        forgotConfMsg: 'success message',
        user: null,
        isAuthorized: false
      }
    );
  })

  it('forgot reset token correct', () => {
    expect(reducer(
      {
        ...initialState
      },
        {
          type: 'FORGOT_RESET_TOKEN_CORRECT',
          payload: 'success message' 
        }
    )).toEqual(
      {
        ...initialState,
        error: false,
        errorMessage: null,
        forgotConfMsg: 'success message',
        user: null,
        isAuthorized: false
      }
    );
  })

  it('password change successful', () => {
    expect(reducer(
      {
        ...initialState
      },
        {
          type: 'PASSWORD_CHANGE_SUCCESS',
          payload: 'success message' 
        }
    )).toEqual(
      {
        ...initialState,
        error: false,
        errorMessage: null,
        forgotConfMsg: 'success message',
        user: null,
        isAuthorized: false
      }
    );
  })
});
