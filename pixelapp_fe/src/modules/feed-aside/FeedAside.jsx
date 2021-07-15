import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FollowingsList from './components/followings-list/FollowingsList';
import { updateAvatarUrlPath } from './../../shared/utils/avatarUtil';

import { Grid, Divider, Avatar } from '@material-ui/core';

export const FeedAside = (props) => {
  const { user } = props;
  const followings = props.users.filter(item => item.following === true);

  return <div className="feed-aside">
    <Grid className="grid-inside" item xs={11} container direction={"column"} justify={"space-between"}>
      <Grid className="user-info" container alignItems={"center"} justify={"center"}>
        <Link to={`/profile/${user.nickname}`}>
          <Avatar
            alt={"user avatar"}
            src={updateAvatarUrlPath(user.avatar)}
            className="user-avatar"
          />
        </Link>
        <Link to={`/profile/${user.nickname}`}>
          <p className="light-grey user-nickname">
            {user.nickname}
          </p>
        </Link>
      </Grid>

      <Divider />

      <FollowingsList 
        user={user}
        followings={followings}
        handleFavorite={props.handleFavorite}
      />

      <Divider />

      <Grid className="footer light-grey" container alignItems={"center"} justify={"center"}>
        &copy; Lv-330 Node.js, 2018
      </Grid>
    </Grid>
  </div>
};

FeedAside.propTypes = {
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleFavorite: PropTypes.func.isRequired
};

export default FeedAside;
