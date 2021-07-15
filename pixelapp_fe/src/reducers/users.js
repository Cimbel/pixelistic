export const initialState = {
  error: false,
  errorMessage: null,
  users: [],
  loading: false,
};

const updateUserProps = (oldUser, newUser) => {
  oldUser.bio = newUser.bio;
  oldUser.website = newUser.website;
  oldUser.fullName = newUser.fullName;
  oldUser.avatar = newUser.avatar;
  oldUser.nickname = newUser.nickname;
}

const editUser = (users, payload) => {
  return users.map( item => {
    if (item._id === payload._id) {
      updateUserProps(item, payload)
    }
    return item;
  });
};

const editOrAdd = (users, payload) => {
  let isOldUser = false;
  let newUsers = users.map( item => {
    if (item._id === payload._id) {
      updateUserProps(item, payload)
      isOldUser = true
    }
    return item;
  });
  if (isOldUser) {
    return newUsers
  } else {
    return [...users, payload]
  }
}

const changeConnectionStatus = (users, payload) => {
  return users.map(item => {
    if (item.followingId === payload.userId) {
      item.status = payload.status;
      item.socketId = payload.socketId;
    }
    return item;
  });
};

const loadCurrentFollowings = (users, payload) => {
  if (payload) {
    return payload.followingsInfo.map((item, i) => {
      const { followings } = payload;
      item.status = followings[i].status;
      item.avatar = followings[i].avatar;
      item.nickname = followings[i].nickname;
      item.fullName = followings[i].fullName;
      item.website = followings[i].website;
      item.bio = followings[i].bio;
      item.posts = followings[i].posts;
      item.followingInfoId = item._id;
      item._id = followings[i]._id;
      item.following = true;
      item.followers = followings[i].followers;
      item.followings = followings[i].followings;
      return item;
    });
  }
  return users;
};

const handleFavorite = (users, payload) => {
  return users.map(item => {
    if (item.followingInfoId === payload.followingInfoId) {
      item.favorite = payload.checked;
    }
    return item;
  });
};

const unfollow = (users, payload) => {
  return users.map(item => {
    if (item.followingId === payload) {
      item.following = false;
    }
    return item;
  })
};

const follow = (users, payload) => {
  return users.map(item => {
    if (item._id === payload.followingId) {
      item.favorite = false;
      item.following = true;
      item.followingId = payload.followingId;
      item.followingInfoId = payload.followingInfoId;
      item.newMessages = payload.newMessages;
      item.status = payload.status;
    }
    return item;
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOADING':{
      return {
        ...state,
        loading: true
      }
    }

    case 'FOLLOW_SUCCESS':
    return {
      ...state,
      error: false,
      errorMessage: null,
      users: follow(state.users, action.payload)
    };

    case 'UNFOLLOW_SUCCESS':
    return {
      ...state,
      error: false,
      errorMessage: null,
      users: unfollow(state.users, action.payload)
    };

    case 'ERROR':
    return {
      ...state,
      error: true,
      errorMessage: action.payload.response.data.error,
      successMsg: null

    };

    case 'CLEAR_ERROR_AND_MESSAGES':
    return {
      ...state,
      error: false,
      errorMessage: null,
      successMsg: null

    };

    case 'HANDLE_FAVORITE_SUCCESS':
    return {
      ...state,
      error: false,
      errorMessage: null,
      users: handleFavorite(state.users, action.payload),
    };

    case 'LOAD_CURRENT_FOLLOWINGS':
    return {
      ...state,
      users: loadCurrentFollowings(state.users, action.payload)
    };

    case 'CLEAN_USERS_ARRAY':
    return initialState;

    case 'GET_PROFILE_SUCCESS':
    return {
      ...state,
      error: false,
      errorMessage: null,
      users: editOrAdd(state.users, action.payload),
      loading: false
    };

    case 'PROFILE_UPDATED_SUCCESS':
    return {
      error: false,
      errorMessage: null,
      users: editUser(state.users, action.payload),
      loading: false
    };

    case 'CHANGE_PASSWORD':
    return {
      ...state,
      error: false,
      errorMessage: null,
      successMsg: action.payload
    };

    case 'STATUS_CONNECTION_CHANGE':
    return {
      ...state,
      error: false,
      errorMessage: null,
      users: changeConnectionStatus(state.users, action.payload)
    }

    default:
    return state;
  }
}
