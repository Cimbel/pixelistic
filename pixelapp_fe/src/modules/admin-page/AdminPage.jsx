import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { getUsers, updateUserStatus, disableUser } from  './../../actions/admin-page';
import DashboardFrame from  './components/DashboardFrame';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';
import { Redirect } from 'react-router-dom';

class AdminPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    };
  };

  componentDidMount() {
    this.props.getUsers();
  };

  static getDerivedStateFromProps(next, state) {
    state.users = next.users;
    return state;
  };

  render() {
    if (!this.props.user.isAdmin) {
      return <Redirect to="/"/>
    } 
    if (this.state.users.length) {
      return (
        <Grid>
          <DashboardFrame users={this.state.users} handleStatusChange={this.handleSwitchChange} handleDisableUser={this.handleDisableUser} />
        </Grid>
      );
    };
    return <LoadingSpinner/>
  };

  handleSwitchChange = (e) => {
    const id = e.target.value;
    const status = e.target.checked;
    this.props.updateUserStatus(id, status);
  };
  
  handleDisableUser = (event, IDs) => {
    this.props.disableUser(IDs);
  };
};

export default connect(
  state => ({
    users: state.dashboard.users,
  }),
  dispatch => ({
      getUsers: () => dispatch(getUsers()),
      updateUserStatus: (id, status) =>
        dispatch(updateUserStatus(id, status)),
      disableUser: (IDs) =>
        dispatch(disableUser(IDs))
  })
)(AdminPage)
