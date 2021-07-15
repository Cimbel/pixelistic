import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { PersonAdd, RemoveCircleOutline } from '@material-ui/icons';

export default class DashboardBtn extends Component {

  render() {
    const { current, profileUser } = this.props;
    
    if(profileUser._id === current._id) {
      return <Button variant="outlined" id="dashboard-btn">
        <Link
          className="link"
          to={`/edit-profile/${profileUser.nickname}`}
        >
          Edit profile
        </Link>
      </Button>
    }

    if (profileUser.following) {
      return <Button 
        variant="outlined" 
        id="dashboard-btn"
        onClick={this.handleUnfollow}
      >
        <RemoveCircleOutline />        
      </Button>;
    } else {
      return <Button 
        variant="outlined" 
        id="dashboard-btn"
        onClick={this.handleFollow}
      >
        <PersonAdd />
      </Button>;
    }
  };

  handleFollow = () => {
    const data = {
      current: this.props.current._id, 
      following: this.props.profileUser._id
    };
    this.props.postAddToFeedLine(this.props.profileUser._id);
    this.props.follow(data);
  };

  handleUnfollow = () => {
    const data = {
      current: this.props.current._id, 
      followingId: this.props.profileUser.followingId,
      followingInfoId: this.props.profileUser.followingInfoId
    };
    this.props.postRemoveFromFeedLine(this.props.profileUser._id);
    this.props.unfollow(data);
  }
};
