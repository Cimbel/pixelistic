import React from 'react';
import { Toolbar } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const UsersCountBar = props => {
  const { users } = props;
  let numActive = 0;
  let numSuspended = 0;
  const countActive = users.map(item => {
    item.isActive ? numActive += 1 : numSuspended +=1;
    return item;
  });
  
  return (
    <Toolbar>
      <div className="count-bar">
        <div className="count-bar_item">
          <div className="count-bar_item-heading"> 
            <GroupIcon className="count-bar_icon count-bar_total-icon" /> 
            <span className="count-bar_item-title">Total Users</span>
          </div>
          <div className="count-bar_item-number">
            {users.length}
          </div>   
        </div>
        <div className="count-bar_item">
          <div className="count-bar_item-heading"> 
            <PersonIcon className="count-bar_icon count-bar_active-icon" />
            <span className="count-bar_item-title">Active</span>
          </div>
          <div className="count-bar_item-number">
            {numActive}
          </div>
        </div>
        <div className="count-bar_item">
          <div className="count-bar_item-heading"> 
            <PersonOutlineIcon className="count-bar_icon count-bar_suspended-icon"/> 
            <span className="count-bar_item-title">Suspended</span>
          </div>
          <div className="count-bar_item-number">
            {numSuspended}
          </div>
        </div>
      </div>  
    </Toolbar>
  );
};

export default UsersCountBar;
