import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import LabelBottomNav from '../label-bottom-nav/LabelBottomNav';
import FollowingItem from '../following-item/FollowingItem';

export class FollowingsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mappedFollowings: null
    };
  }

  render() {
    let mappedFollowings;
    if (!this.state.mappedFollowings) {
      mappedFollowings = this.renderFirstTime();
    } else {
      mappedFollowings = this.state.mappedFollowings;
    }

    return <div className="followings-list">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        {mappedFollowings}
      </Scrollbars>
      <LabelBottomNav 
        handleABC={this.sortByABC}
        handleFavorites={this.sortByFavorites}
        handleReceived={this.sortByReceived}
        handleOnline={this.sortByOnline}
      />
    </div>
  }

  sortByFavorites = () => {
    const filteredFollowings = this.props.followings.filter(item => item.favorite)
    this.mapFollowings(filteredFollowings);
  }

  sortByReceived = () => {
    const filteredFollowings = this.props.followings.filter(item => item.newMessages > 0);
    this.mapFollowings(filteredFollowings);
  }

  sortByOnline = () => {
    const filteredFollowings = this.props.followings.filter(item => item.status === 'online');
    this.mapFollowings(filteredFollowings);
  }

  sortByABC = () => {
    const filteredFollowings = this.props.followings.sort((a, b) => a.nickname > b.nickname);
    return this.mapFollowings(filteredFollowings);
  }

  mapFollowings = followings => {
    const mappedFollowings = followings.map(item => {
      return <FollowingItem 
        following={item}
        key={item.followingId}
        handleFavorite={this.handleFavorite}
      />
    });
    this.setState({mappedFollowings});
  }

  renderFirstTime = () => {
    return this.props.followings.sort((a, b) => a.nickname > b.nickname)
      .map(item => {
        return <FollowingItem 
          following={item}
          key={item.followingId}
          handleFavorite={this.handleFavorite}
        />
      });
  }

  handleFavorite = (checked, followingInfoId) => {
    const data = {checked, followingInfoId};
    return this.props.handleFavorite(data);
  }
};

FollowingsList.propTypes = {
  followings: PropTypes.array.isRequired,
  handleFavorite: PropTypes.func.isRequired
};

export default FollowingsList;
