import { dashboardAPI } from '../../api/admin-page-api';

export const getUsers = () => {
  return dispatch => {
    return dashboardAPI.getUsers().then(response => {
      dispatch({ type: 'LOAD_USERS_SUCCESS', payload: response.data.payload });
    }, err => {    
      dispatch({ type: 'LOAD_USERS_ERROR', payload: err })
    });
  }
}

export const updateUserStatus = (id, status) => {
  return dispatch => {
    return dashboardAPI.updateUserStatus(id, status).then(response => {
      dispatch({ type: 'USER_STATUS_UPDATED', payload: response.data.payload });
    }, err => {    
      dispatch({ type: 'USER_STATUS_ERROR', payload: err })
    });
  }
}

export const disableUser = (IDs) => {
  return dispatch => {
    return dashboardAPI.disableUser(IDs).then(response => {
      dispatch({ type: 'DISABLE_USER_SUCCESS', payload: response.data.payload });
    }, err => {    
      dispatch({ type: 'DISABLE_USER_FAILURE', payload: err })
    });
  }
}
