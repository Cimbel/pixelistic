import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authValidate, authSignOut, changeFollowersStatus } from './../../actions/auth';
import { cleanUsersArray, loadCurrentFollowings, handleFavorite, changeFollowingsStatus } from '../../actions/followings';
import { postClearPosts, postSessionPosts } from './../../actions/post';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import io from "socket.io-client";
import { port, host } from "../../const/node-server-config";
import Header from '../../shared/components/header/Header';
import AdminPageHeader from '../admin-page/components/admin-page-header/AdminPageHeader';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';


export class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: null,
      user: null
    }

    this.socket.on('connection changed', data => {
      if (this.props.user) {
        this.props.changeFollowingsStatus(data);
        this.props.changeFollowersStatus(data);
      }
    });
  }

  componentDidMount(){
    let accessToken = window.localStorage.getItem('authHeaders')  ? 
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : false;
    if(accessToken && !this.props.isAuthorized) {
      this.props.authValidate();
    }
    window.addEventListener('unload', () => {
      this.emitOffline(this.props.user);
    });
    this.setState({ accessToken });
  }

  componentDidUpdate() {
    const { user } = this.props;
    if(!this.props.currentSessionPosts.length && !this.props.wasLoadedFirstTime && user) {
      this.props.postSessionPosts(user);
      this.props.loadCurrentFollowings(user);
      this.emitOnline(this.props.user);
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if ( (this.state.accessToken === false && !this.props.isAuthorized) || this.props.tokenBroken) {
      return <Redirect to='/sign-in'/>;
    }

    if (this.props.isDisabled) {
      window.localStorage.removeItem('authHeaders')
      return <Redirect to='/disabled-account' />;
    }

    if (this.state.accessToken && this.props.isAuthorized) {
      return <Route {...rest} render={matchProps => (
        <div className="main-layout">
          {this.props.path === '/dashboard' ? <AdminPageHeader onSignOut={this.signOut}/> : <Header user={this.props.user} onSignOut={this.signOut}/>}
          <div className="content">
            <Component 
              {...matchProps} 
              user={this.props.user} 
              users={this.props.users} 
              posts={this.props.currentSessionPosts}
              handleFavorite={this.props.handleFavorite}
            />
          </div>
        </div>
      )} />
    }

    return <LoadingSpinner/>
  }

  socket = io.connect(`${host}:${port}`);

  signOut =  async () => {
    this.setState({ accessToken: false });
    this.emitOffline(this.props.user);
    this.socket.disconnect();
    await this.props.authSignOut();
    this.props.postClearPosts();
    this.props.cleanUsersArray();
  }

  emitOnline = (user) => {
    const sockets = user.followers.filter(item => item.socketId);
    setTimeout(() => {
      this.socket.emit(
        'iOnline',
        { 
          sockets,
          status: 'online',
          socketId: this.socket.id,
          userId: user._id,
        }
      );
    }, 0);
  }

  emitOffline = (user) => {
    const sockets = user.followers.filter(item => item.socketId);
    this.socket.emit(
      'iOffline', 
      { 
        sockets,
        status: 'offline',
        socketId: 'offline',
        userId: user._id,
      }
    );
  }
};

export default connect(
  state => ({
    user: state.auth.user,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    isAuthorized: state.auth.isAuthorized,
    tokenBroken: state.auth.tokenBroken,
    currentSessionPosts: state.post.currentSessionPosts,
    wasLoadedFirstTime: state.post.wasLoadedFirstTime,
    users: state.users.users,
    loading:  state.users.loading,
    isDisabled: state.auth.isDisabled
  }),
  dispatch => ({
    authValidate: (email, password) => dispatch(authValidate(email, password)),
    authSignOut: () => dispatch(authSignOut()),
    cleanUsersArray: () => dispatch(cleanUsersArray()),
    changeFollowersStatus: data => dispatch(changeFollowersStatus(data)),
    changeFollowingsStatus: data => dispatch(changeFollowingsStatus(data)),
    postClearPosts: () => dispatch(postClearPosts()),
    postSessionPosts: (user) => dispatch(postSessionPosts(user)),
    loadCurrentFollowings: (user) => dispatch(loadCurrentFollowings(user)),
    handleFavorite: (data) => dispatch(handleFavorite(data))
  })
)(MainLayout);

