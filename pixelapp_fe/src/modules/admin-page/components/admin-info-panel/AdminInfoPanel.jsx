import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import UsersCountBar from './UsersCountBar';
import { updateAvatarUrlPath } from './../../../../shared/utils/avatarUtil';

const AdminInfoPanel = props => {
  const {admin, users} = props;
  return (
    <Grid item xs={12} className="admin-info-panel">
      <div className="admin-info-panel_profile">
        <Avatar
          alt="Administrator Avatar"
          src={updateAvatarUrlPath(admin.avatar)}
          className="admin-info-panel_avatar"
        />
        <div> 
          <div>{admin.nickname}</div>
          <div className="admin-info-panel_title">Administrator</div>
        </div>
      </div>
      <UsersCountBar users={users} />
    </Grid>
  );
};

export default AdminInfoPanel;
