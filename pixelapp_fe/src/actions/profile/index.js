import { profileAPI } from '../../api/profile-api';

export const getProfile = (nickname) => {
    return dispatch => {
      dispatch({ type:'LOADING' });
        return profileAPI.getProfile(nickname).then(payload => {
            dispatch({ type: 'GET_PROFILE_SUCCESS', payload});
        }, err => {    
            dispatch({ type: 'ERROR', payload: err })
        });
    }
};

export const updateProfile = (_id, fullName, newNickname, website, bio, avatar, updateStateCallback, onErrorCallback) => {
    return dispatch => {
        return profileAPI.updateProfile(_id, fullName, newNickname, website, bio, avatar).then(userprofile => {
            updateStateCallback();
            dispatch({ type: 'PROFILE_UPDATED_SUCCESS', payload: userprofile });
        }, err => {
            dispatch({ type: 'ERROR', payload: err })
            if (typeof onErrorCallback === 'function') {
                onErrorCallback();
            }
        });
    }
};

export const userChangePassword = (_id, oldPassword, newPassword, newPasswordConf)  => {
    return dispatch => {
        return profileAPI.userChangePassword(_id, oldPassword, newPassword, newPasswordConf).then(success => {
            dispatch({ type: 'CHANGE_PASSWORD', payload: success });
        }, err => {
            dispatch({ type: 'ERROR', payload: err })
        });
    }
};
