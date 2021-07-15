import React , { Component } from 'react';
import { Grid, IconButton} from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import PropTypes from 'prop-types';

import PostHeader from '../../../../shared/components/post-header/PostHeader';
import PostFooter from '../../../../shared/components/post-footer/PostFooter';
import { awsImage } from '../../../../const/node-server-config';

export class PostPage extends Component {
  constructor(props){
    super(props);
    this.postPage = React.createRef();
    this.postImg = React.createRef();
    this.postInfo = React.createRef();
  }

  componentDidMount(){
      this.postPage.current.focus();
      this.postInfo.current.style.height = `${this.postImg.current.height}px`;
      window.addEventListener('resize', this.onResize)
  }
  
  componentDidUpdate(){
      this.postInfo.current.style.height = `${this.postImg.current.height}px`;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render () {
    return <div className="post-page" ref={this.postPage}  onClick={this.props.onClosePostPage} onKeyDown={this.handleKeyPress} tabIndex="0" >
      <Grid container item direction="row" xs={12}>
        <Grid container item direction="column" xs={1} justify="center" alignItems="center">
            {this.props.leftButton ?  
            <IconButton className="nav-btn nav-btn-left" color="primary" onClick={this.navigateBack}  >
              <KeyboardArrowLeft className="icon"/>
            </IconButton> : null}
        </Grid>

        <Grid className="post-cont" direction="row" container alignItems="center" justify="center">
          <Grid className="top photo-cont" item onClick={this.noClose}> 
              <img alt="user-img" src={ `${awsImage}/${this.props.post.image}`} ref={this.postImg} onClick={this.navigateNext}/>
          </Grid>
          
          <Grid className="top" item onClick={this.noClose}>
          <div className="post-info " ref={this.postInfo}> 
              <PostHeader  
                authorName={this.props.post.author.nickname}
                authorGeo={this.props.post.geolocation}
                authorImg={this.props.post.author.avatar} 
              />   
            
              <PostFooter
                comments={this.props.post.comments}
                liked={this.props.post.likes.indexOf(this.props.userId) > -1}
                likesAmount={this.props.post.likes.length}
                postId={this.props.post._id}
                authorName={this.props.post.author.nickname}
                authorId={this.props.post.author._id}
                authorComment={this.props.post.description}
                date = {this.props.post.timestamp}
                nickname={this.props.userNickname}
                userId={this.props.userId}
                imagePath = {this.props.post.image}
                onClosePostPage = {this.props.onClosePostPage}
              />
            </div>
         </Grid>

         </Grid>
           
        <Grid container item direction="column" xs={1} justify="center" alignItems="center" >
          {this.props.rightButton ?  
            <IconButton className="nav-btn nav-btn-right" color="primary" onClick={this.navigateNext} >
              <KeyboardArrowRight className="icon"/>
            </IconButton>: null}
        </Grid>
      </Grid>
    </div>
  }

  handleKeyPress = (e) => {
    switch(e.keyCode){
      case 37: this.props.onChangePost(-1); break;
      case 39: this.props.onChangePost(1); break;
      case 27: this.props.onClosePostPage(); break;
      default: break;
    }
  }

  navigateBack = (e) => {
    e.stopPropagation();
    this.postPage.current.focus();
    this.props.onChangePost(-1);
  }

  navigateNext = (e) => {
    e.stopPropagation();
    this.postPage.current.focus();
    this.props.onChangePost(1);
  }

  noClose = (e) => {
    e.stopPropagation();
  }
  
  onResize = () => {
    this.forceUpdate();
  }
}

PostPage.propTypes = {
  post: PropTypes.object.isRequired,
  onChangePost: PropTypes.func.isRequired,
  onClosePostPage: PropTypes.func.isRequired
};

export default PostPage;


