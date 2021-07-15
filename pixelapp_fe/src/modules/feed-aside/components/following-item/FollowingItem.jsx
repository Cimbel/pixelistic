import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Like from '../../../../shared/components/like/Like';
import { updateAvatarUrlPath } from './../../../../shared/utils/avatarUtil';

import { 
  Avatar,
  Badge,
  ExpansionPanel, 
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button
} from '@material-ui/core';
import { 
  ExpandMore, 
  Mail,
  Person
} from '@material-ui/icons';

export const FollowingItem = (props) => {
  const { 
    nickname,
    status,
    newMessages,
    avatar,
    favorite,
    followingInfoId
  } = props.following;

  let badge;
  if (newMessages > 0) {
    badge = <Badge 
      badgeContent={newMessages} 
      color="secondary"
      className="badge"
    >
      <Mail />
    </Badge>;
  }

  return <Fragment>
    <ExpansionPanel className="following-item">
      <ExpansionPanelSummary className="exp-summary" expandIcon={<ExpandMore />}>
        <div className="chip">
          <Avatar
            src={updateAvatarUrlPath(avatar)} 
            alt={"avatar"}
            className="avatar"
          />
          <div 
            className={`status status-${status}`} 
          />
          <p className={"nickname"}>
            {nickname}
          </p>
          {badge}
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails className="exp-details">
        <Button variant={"contained"} size="small" className="btn">
          <Link to={`/profile/${nickname}`} className="link">
            Profile
            <Person />
          </Link>
        </Button>
        <Button variant={"contained"} size="small" className="btn msgs-btn">
          <Link to="" className="link">
            Messanger
            <Mail />
          </Link>
        </Button>
        <Like
          className="favorite"
          liked={favorite}
          parentId={followingInfoId}
          handleLike={props.handleFavorite}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </Fragment>
};

FollowingItem.propTypes = {
  following: PropTypes.object.isRequired,
};

export default FollowingItem;
