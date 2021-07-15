import React from 'react';
import ScrollToTop from 'react-scroll-up';
import PropTypes from 'prop-types'

import FeedLine from '../feed-line/FeedLine';
import FeedAside from '../feed-aside/FeedAside';
import UpstairsBtn from '../../shared/components/upstairs-btn/UpstairsBtn';

export const Feed = (props) => {
  return <div 
    className="feed" 
  >
    <FeedLine 
      nickname={props.user.nickname}
      user={props.user} 
      posts = {props.posts}
    />
    <FeedAside 
      user={props.user}
      users={props.users}
      handleFavorite={props.handleFavorite}
    />
    <ScrollToTop showUnder={160}>
      <UpstairsBtn />
    </ScrollToTop>
  </div>
};

Feed.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  handleFavorite: PropTypes.func.isRequired
};
  
export default Feed;
