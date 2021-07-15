import React , { Component } from 'react';
import { Grid } from '@material-ui/core';
import { BrokenImage, AddAPhoto } from '@material-ui/icons';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { rowSize } from '../../../../const/user-page-config.js';
import { awsImage } from '../../../../const/node-server-config'

import MinimizedPost from '../minimized-post/MinimizedPost';
import PostPage from '../post-page/PostPage';

export class UserPosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      rowSize: null,
      postOpenIndex: -1,
    }
  } 

  componentDidUpdate() {
    if (this.state.postOpenIndex > -1){
      disableBodyScroll();
    } else {
      enableBodyScroll();
    };
  }

  static getDerivedStateFromProps (nextProps, state) {
    state.posts = nextProps.posts;
    state.rowSize = rowSize;
    return  state;
  }

  componentWillUnmount() {
    enableBodyScroll();
  }

  render () {
    if(this.state.posts.length){
      return <div className="user-posts">
        <Grid container direction="column" alignItems="center" item xs={12} className="user-images">
          <div className="posts-header">
              <span className="posts-title">Posts</span>
              {this.props.ownPage ?   <Link to="/upload"> <AddAPhoto className="right-add-photo"/> </Link> : null }
          </div>

          {this.generateRows()}

          {this.state.postOpenIndex > -1 ? <PostPage 
            post = { this.state.posts[this.state.postOpenIndex] }
            userId = {this.props.userId}
            userNickname= {this.props.userNickname}
            onChangePost = {this.changeCurrentPost}
            onClosePostPage = {this.closePostPage}
            leftButton = { !(this.state.postOpenIndex === 0 )}
            rightButton = { !(this.state.postOpenIndex === this.state.posts.length - 1) }
            /> : null}
        </Grid>
      </div>
    }

    return <div className="empty-posts">  
      <p> {this.props.ownPage ? 'You have no posts' : 'This user has no posts yet'} </p>
      { this.props.ownPage 
      ? <Link to="/upload"> <AddAPhoto className="add-photo"/> </Link> 
      : <BrokenImage/> }
    </div>
  }

  generateRows = () => {
    const posts = this.state.posts;
    const rowsCount = Math.ceil(posts.length / this.state.rowSize) || 1;
    let curPost = 0;
    let table = [];
    
    for(let i = 0; i < rowsCount; i++) {      
      let row = [];
      for( let j = 0; j < this.state.rowSize; j++) {
        if(curPost < posts.length) {
          const rowItem = <MinimizedPost
            key = {posts[curPost]._id}
            id = {posts[curPost]._id}
            img = { `${awsImage}/${posts[curPost].image}`}
            likes = {posts[curPost].likes.length}
            comments = {posts[curPost++].comments.length}
            onOpenPost = {this.openPostPage}
          />   
          row = [ ...row, rowItem ];
        
        } else {
          break;
        }
      }
      const completeRow =  <Grid key={i} container item direction="row" xs={8} className="box"> {row} </Grid>;
      table = [ ...table, completeRow ];
    }
    return table;
  }

  openPostPage = (id) => {
    disableBodyScroll();
    const index = this.state.posts.findIndex(item => item._id === id);
    this.setState({ postOpenIndex: index });  
  }

  closePostPage = () => {
    this.setState({ postOpenIndex: -1 });
  }

  changeCurrentPost = (val) => {
    let postOpenIndex = this.state.postOpenIndex;
    postOpenIndex += val;
    
    if(postOpenIndex >= this.state.posts.length || postOpenIndex < 0){
      return;
    }
    this.setState({ postOpenIndex });
  } 
}

UserPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  userNickname: PropTypes.string.isRequired,
  ownPage: PropTypes.bool.isRequired
}

export default UserPosts;
