import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';

export class Like extends Component {
  render() {
    return <div className="like">
      <Checkbox
        checked={this.props.liked}
        icon={<FavoriteBorder />} 
        checkedIcon={<Favorite />}
        onChange={this.handleChange}
      />
    </div>
  }

  handleChange = (e, checked) => this.props.handleLike(checked, this.props.parentId);
};

Like.propTypes = {
  liked: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired
};

export default Like;
