const initialState = {
    error: false,
    errorMessage: null,
    user: null,
    confMsg: null,
    isAuthorized: false,
    tokenBroken: false,
    isDisabled: false
};

const changeConnectionStatus = (user, payload) => {
    user.followers.map(item => {
      if (item._id === payload.userId) {
        item.socketId = payload.socketId;
      }
      return item;
    });
    return user;
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN_SUCCESS':
        return {
            ...state,
            error: false,
            errorMessage: null,
            user: action.payload,
            confMsg: null,
            tokenBroken: false,
            isAuthorized: true
        };

        case 'VERIFY_SUCCESS':
        return {
            ...state,
            error: false,
            errorMessage: null,
            user: action.payload,
            confMsg: null,
            isAuthorized: false
        };
        
        case 'EMAIL_SENDED':
        return {
            ...state,
            error: false,
            errorMessage: null,
            user: null,
            confMsg: action.payload,
            isAuthorized: false
        };

        case 'SIGN_IN_BANNED': 
        return {
            ...state,
            isDisabled: true,
            isAuthorized: true
        }

        case 'VERIFY_ERROR':
        return {
            ...state,
            error: true,
            errorMessage: null,
            user: action.payload,
            confMsg: null,
        };

        case 'EMAIL_EXIST':
        return{
            error: false,
            errorMessage: null,
            user: null,
            forgotConfMsg: action.payload,
            isAuthorized: false
        };

        case 'FORGOT_EMAIL_EXIST':
        case 'FORGOT_RESET_TOKEN_CORRECT':
        case 'PASSWORD_CHANGE_SUCCESS':
        return{
            error: false,
            errorMessage: null,
            user: null,
            forgotConfMsg: action.payload,
            isAuthorized: false
        };

        case 'FORGOT_EMAIL_DOESNOT_EXIST':
        case 'FORGOT_RESET_TOKEN_INCORRECT':
        return {
            ...state,
            error: true,
            forgotErrMsg: action.payload.response.data.error,
            user: null,
            confMsg: null,
            isAuthorized: false
        };
        
        case 'SIGN_IN_ERROR':
        case 'REGISTER_ERROR':
        case 'EMAIL_DOESNOT_EXIST':
        case 'PASSWORD_DONT_CHANGE':
        return {
            ...state,
            error: true,
            errorMessage: action.payload.response.data.error,
            user: null,
            confMsg: null,
            isAuthorized: false
        };

        case 'VALIDATE_ERROR':
        return {
          ...state,
          error: true,
          errorMessage: 'session timeout',
          tokenBroken: true,
          user: null,
          confMsg: null,
          isAuthorized: false
        };

        case 'SIGN_OUT':
        return {
            ...state,
            error: false,
            errorMessage:null,
            user: null,
            confMsg: null,
            isAuthorized: false
        };


        case 'CHANGE_FOLLOWERS_SOCKET':
        return {
            ...state,
            error: false,
            errorMessage: null,
            user: changeConnectionStatus(state.user, action.payload)
        }

        default:
        return state
    }
}
