export const initialState = {
  error: false,
  errorMessage: null,
  users: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOAD_USERS_SUCCESS':
      return {
        error: false,
        errorMessage: null,
        users: action.payload
      };
    case 'LOAD_USERS_ERROR':
      return {
        error: true,
        errorMessage: action.payload.response.data.error,
        users: null
      };
    case 'USER_STATUS_UPDATED':
      let updatedUsers = state.users.map( item =>{
        if(item._id === action.payload.id){
          item.isActive = action.payload.status;
        }
        return item;
      })
      return {
        error: false,
        errorMessage: null,
        users: updatedUsers
      };
    case 'USER_STATUS_ERROR':
      return {
        error: true,
        errorMessage: action.payload.response.data.error,
        users: null
      };
    case 'DISABLE_USER_SUCCESS':
      return {
        error: false,
        errorMessage: null,
        users: action.payload
      };
    case 'DISABLE_USER_FAILURE':
    return {
      error: true,
      errorMessage: action.payload.response.data.error,
      users: null
    };
    default:
    return state
  }
}
