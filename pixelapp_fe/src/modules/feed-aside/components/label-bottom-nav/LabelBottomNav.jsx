import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { ImportExport, Favorite, Mail, WifiTethering } from '@material-ui/icons';

export class LabelBottomNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    this.setState({
      value: 'ABC'
    });
  }

  render() {
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className="bottom-nav">
        <BottomNavigationAction
          label="ABC"
          value="ABC"
          icon={<ImportExport />}
          onClick={this.props.handleABC}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<Favorite />}
          onClick={this.props.handleFavorites}
        />
        <BottomNavigationAction
          label="Received"
          value="received"
          icon={<Mail />}
          onClick={this.props.handleReceived}
        />
        <BottomNavigationAction
          label="Online"
          value="online"
          icon={<WifiTethering />}
          onClick={this.props.handleOnline}
        />
      </BottomNavigation>
    );
  }

  handleChange = (e, value) => {
    this.setState({ value });
  };
};

LabelBottomNav.propTypes = {
  handleABC: PropTypes.func.isRequired,
  handleFavorites: PropTypes.func.isRequired,
  handleReceived: PropTypes.func.isRequired,
  handleOnline: PropTypes.func.isRequired,
};

export default LabelBottomNav;
