import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { initCmntsAmount, expandCmntsAmount } from '../../../const/post-config';

import Like from '../like/Like';
import CustomTime from '../custom-time/CustomTime';
import { postLikeChange, postCommentAdd, postRemovePost } from '../../../actions/post';

import { Grid, Divider, TextField, Checkbox, IconButton } from '@material-ui/core';
import { CommentOutlined, DeleteOutlined } from '@material-ui/icons';


export class PostFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      liked: false,
      moreComments: false,
      likesAmount: null,
      _id: '',
      authorName: '',
      authorComment: '',
      date: '',
      commentsAmount: null,
      commentCheckbox: false,
      startRemoving: false
    };

    this.textfieldRef = React.createRef();
  }

  componentDidMount(){
    this.setState({
      commentsAmount: initCmntsAmount
    })
  }

  static getDerivedStateFromProps(nextProps, state) {
    state.comments = nextProps.comments;
    state.liked = nextProps.liked;
    state.likesAmount = nextProps.likesAmount;
    state.postId = nextProps.postId;
    state.authorName = nextProps.authorName;
    state.authorId = nextProps.authorId;
    state.authorComment = nextProps.authorComment;
    state.date = nextProps.date;
    state.imagePath = nextProps.imagePath
    return state;
  }
  
  render() {
    let comments = this.state.comments;
    const quantity = comments.length <= expandCmntsAmount ? `all ${comments.length}` : 'last'; 

    let load = <p className="light-grey load-comments" onClick={this.expandComments}>
      Load {quantity} comments
    </p>;

    const mappedComments = comments
      .filter((item, i) => i >= (comments.length - this.state.commentsAmount))
      .map((item, i) => {
        return <p className="comment" key={i}>
        <Link to={`/profile/${item.author}`}>
          <span className="author-name">
            {item.author}
          </span>
        </Link>
          <span className="author-comment">
            {item.comment}
          </span>
        </p>
      });

    return <Grid className="post-footer" item xs={11} container direction={"column"}>
      <Grid className="likes-panel" container alignItems={"center"} item xs={12}>
        <p className="likes-amount">
          {this.state.likesAmount} likes
        </p>
        <Like
          className="like-comp"
          liked={this.state.liked}
          handleLike={this.handleLike}
        />
        <Checkbox
          checked={this.state.commentCheckbox}
          onChange={this.focusTextfield}
          color={"primary"}
          icon={<CommentOutlined />}
          checkedIcon={<CommentOutlined />}
        />

        {this.props.userId === this.state.authorId ?
          <IconButton color="secondary" onClick={this.handleRemovePost} disabled={this.state.startRemoving}>
            <DeleteOutlined />
          </IconButton> 
          : null
         }
      </Grid>
    
      {this.state.authorComment ? <p className="comment author">
        <Link to={`/profile/${this.state.authorName}`}>
          <span className="author-name">
            {this.state.authorName}
          </span>
        </Link>
        <span className="author-comment">
          {this.state.authorComment}
        </span>
      </p> : null}
         
      {this.state.moreComments || (comments.length <= initCmntsAmount) ? null :  load}

      {mappedComments}

      <CustomTime timestamp={this.state.date}/>

      <Divider />
      
      <TextField 
        inputRef={this.textfieldRef}
        className="input-override text-field"
        multiline={true}
        placeholder={"Type your comment..."}
        onKeyPress={this.handleTextfieldInput}
        onBlur={this.handleTextfieldBlur}
        onFocus={this.handleTextfieldFocus}
      />
      
    </Grid>
  }

  expandComments = () => {
    this.setState({
      moreComments: true,
      commentsAmount: expandCmntsAmount
    });
  }

  handleLike = () => {
    this.setState((prev) => {
      const quantity = prev.liked ? prev.likesAmount - 1 : prev.likesAmount + 1;
      const type = prev.liked ? 'unlike' : 'like';
      this.props.postLikeChange(this.props.postId, this.props.userId, type); 
      return {
        likesAmount: quantity,
        liked: !this.state.liked,
      };
    });
  }

  handleTextfieldInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }

    if (e.key === 'Enter' && !e.shiftKey && e.target.value !== '') {
      const val = e.target.value;
      const comment = {
        author: this.props.nickname,
        comment: val
      }

      this.props.postCommentAdd(this.props.postId, this.props.nickname, this.props.user.avatar, val);
      e.target.value = '';
      
      this.setState((prev) => {
        return {
          comments: [...prev.comments, comment],
        };
      });
    }
  }

  focusTextfield = () => {
    this.textfieldRef.current.focus();
    this.setState({
      commentCheckbox: true
    });
  }

  handleTextfieldBlur = () => {
    this.setState({
      commentCheckbox: false
    });
  }

  handleTextfieldFocus = () => {
    this.setState({
      commentCheckbox: true
    });
  }

  handleRemovePost = () => {
    const { postId, authorId, imagePath } = this.state;
    this.props.postRemovePost(postId, authorId, imagePath);
    this.props.onClosePostPage();
    this.setState({ startRemoving: true });
  }
};

PostFooter.propTypes = {
  comments: PropTypes.array.isRequired,
  liked: PropTypes.bool.isRequired,
  likesAmount: PropTypes.number.isRequired,
  postId: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorComment: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired
};

export default connect(
  state => ({
    isLoading: state.post.isLoading,
    user: state.auth.user
  }),
  dispatch => ({
    postLikeChange: (postId, userId, type) => dispatch(postLikeChange(postId, userId, type)),
    postCommentAdd: (postId, userNickname, userAvatar, text) => dispatch(postCommentAdd(postId, userNickname, userAvatar, text)),
    postRemovePost: (postId, userId, imagePath) => dispatch(postRemovePost(postId, userId, imagePath))
  })
)(PostFooter);
