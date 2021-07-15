import { combineReducers } from 'redux'
import auth from './auth';
import post from './post';
import users from './users';
import dashboard from './admin-page';


export default combineReducers({
    auth,
    post,
    dashboard,
    users
});
