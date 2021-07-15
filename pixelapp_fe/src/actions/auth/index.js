import { authApi } from '../../api/auth-api';

export const authSignIn = (email, password) => {
    return dispatch => {
        return authApi.signIn(email, password).then(user => {
            if(user.disabled) dispatch({ type: 'SIGN_IN_BANNED' });
            else dispatch({ type: 'SIGN_IN_SUCCESS', payload: user });
        }, err => {    
            dispatch({ type: 'SIGN_IN_ERROR', payload: err })
        });
    }
}

export const authSignInSocial = (user) => {
    return dispatch => {
        return authApi.signInSocial(user).then(user => {
            if(user.disabled) dispatch({ type: 'SIGN_IN_BANNED' });
            else dispatch({ type: 'SIGN_IN_SUCCESS', payload: user });
        }, err => {
            dispatch({ type: 'SIGN_IN_ERROR', payload: err })
        });
    }
}

export const authValidate = () => {
    return dispatch => {
        authApi.checkUser().then(user => {
            if(user.disabled) dispatch({ type: 'SIGN_IN_BANNED' });
            else dispatch({ type: 'SIGN_IN_SUCCESS', payload: user });
        }, err => {     
            dispatch({ type: 'VALIDATE_ERROR', payload: err })
        });
    }
}

export const authSignUp = (nickname, email, password, passwordConf) => {
    return dispatch => {
        return authApi.signUp(nickname, email, password, passwordConf).then(confMsg => {
            dispatch({ type: 'EMAIL_SENDED', payload: confMsg });
        }, err => {    
            dispatch({ type: 'REGISTER_ERROR', payload: err })
        });
    }
}

export const authSignOut = () => {
    return dispatch => {
       return authApi.signOut().then(() => dispatch({ type: 'SIGN_OUT'}));
    }
}

export const authVerifyEmail = (hash) => {
    return dispatch => {
        return authApi.verifyEmail(hash).then(user => {
            dispatch({ type: 'VERIFY_SUCCESS', payload: user });
        }, err => {    
            dispatch({ type: 'VERIFY_ERROR', payload: err })
        });
    }
}

export const authForgotEmail = (email) => {
    return dispatch => {
        return authApi.forgotEmail(email).then(text => {
            dispatch({ type: 'FORGOT_EMAIL_EXIST', payload: text });
        }, err => {    
            dispatch({ type: 'FORGOT_EMAIL_DOESNOT_EXIST', payload: err })
        });
    }
}

export const authVerifyPasswordReset = (reset) => {
    return dispatch => {
        return authApi.VerifyPasswordResetToken(reset).then(text => {
            dispatch({ type: 'FORGOT_RESET_TOKEN_CORRECT', payload: text });
        }, err => {    
            dispatch({ type: 'FORGOT_RESET_TOKEN_INCORRECT', payload: err })
        });
    }
}

export const authChangePassword = (password, passwordConf, resetToken) => {
    return dispatch => {
        return authApi.ChangePassword(password, passwordConf, resetToken).then(text => {
            dispatch({ type: 'PASSWORD_CHANGE_SUCCESS', payload: text });
        }, err => {    
            dispatch({ type: 'PASSWORD_DONT_CHANGE', payload: err })
        });
    }
}

export const changeFollowersStatus = payload => {
    return { type: 'CHANGE_FOLLOWERS_SOCKET', payload }
};
