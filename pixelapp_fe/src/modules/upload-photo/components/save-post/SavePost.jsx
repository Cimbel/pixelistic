import React, { Component } from 'react';
import { TextField, Button, ClickAwayListener, InputAdornment} from '@material-ui/core';
import { Redirect } from 'react-router';
import { Comment } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { postAddPost } from '../../../../actions/post';
import LocationAutocomplete from '../location-autocomplete/LocationAutocomplete';
import LoadingSpinner from '../../../../shared/components/loading-spinner/LoadingSpinner'; 

export class SavePost extends Component{
  constructor(props){
    super(props);
    this.state = {
      description: '', 
      customGeolocation: '',
      savingStarted: false
    }
  }

  render(){
    return <div className="save-post"> 
      <ClickAwayListener onClickAway={this.props.onCloseSaveModal}>
        <div className="post-info">
          <div className="field">       
            <TextField 
              InputProps={{startAdornment: (<InputAdornment position="start"><Comment/></InputAdornment>),}}
              onChange={this.changeDescription} className="input" multiline rowsMax={4} rows={1} placeholder="Description"
            />
          </div>
          
          <LocationAutocomplete onSelectLocation ={this.changeLocation}/>
          
          { this.checkSavingProcess() }
          
          {this.state.savingStarted ? null : 
            <Button onClick={this.uploadPost} className="save-btn btn-upload bg-green" color="primary" variant="contained" disabled={this.state.savingStarted}>Save</Button>
          }
        </div>
      </ClickAwayListener>
    </div>
  }

  uploadPost = () => { 
    this.setState({ savingStarted: true });
    
    this.props.postAddPost(
      this.props.photo.current.toDataURL(),
      this.state.description,
      this.state.customGeolocation,
      this.props.user._id
    );
  }

  checkSavingProcess = () => {

    if (this.state.savingStarted && this.props.isLoading) {
      return <LoadingSpinner size={30}/>
    }

    if(this.state.savingStarted && !this.props.isLoading) {
      return <Redirect to={`/profile/${this.props.user.nickname}`}/>
    }

    return;
  }

  changeLocation = (location) => {
    this.setState({ customGeolocation: location });
  }

  changeDescription = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
    }
    this.setState({ description: e.target.value });
  }
}

SavePost.propTypes = {
  user: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
  onCloseSaveModal: PropTypes.func.isRequired
};

export default connect(
  state => ({
    successMessage: state.post.successMessage,
    isLoading: state.post.isLoading
  }),
  dispatch => ({
    postAddPost: (image, description, geolocation, author) => dispatch(postAddPost(image, description, geolocation, author))
  })
)(SavePost)
