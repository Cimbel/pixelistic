import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Grid, Avatar } from '@material-ui/core';

import { updateAvatarUrlPath } from './../../../shared/utils/avatarUtil';

const PostHeader = (props) => {
  return <Grid item xs={11} container className="post-header">
    <Link to={`/profile/${props.authorName}`}>
      <Avatar 
        className="user-avatar" 
        src={updateAvatarUrlPath(props.authorImg)} 
        alt={"user avatar"}
      />
    </Link>

    <div>
      <div className="user-nickname">
        <Link className="link" to={`/profile/${props.authorName}`} >{props.authorName}</Link>
      </div>

      <div className="user-geolocation">
        <Link className="link" to=''>{props.authorGeo}</Link>
      </div>
    </div>
  </Grid>
};

PostHeader.propTypes = {
  authorImg: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorGeo: PropTypes.string.isRequired,
};

export default PostHeader;
