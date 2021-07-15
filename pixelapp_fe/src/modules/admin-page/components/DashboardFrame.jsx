import React from 'react';
import { Grid } from '@material-ui/core';
import AdminInfoPanel from './admin-info-panel/AdminInfoPanel';
import SearchDisablePanel from './admin-action-panel/SearchDisablePanel';
import DashboardTable from './admin-table/DashboardTable';

class DashboardFrame extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: [],
      query: ''
    };
  };
  render() {
    const { selected, query } = this.state;
    const lowerCaseQuery = query.toLowerCase();
    let admin = this.props.users.find(user => user.isAdmin);
    let usersPanel = [ ...this.props.users.filter(user => !user.isAdmin) ];
    let users = query ? usersPanel.filter( user => user.nickname.toLowerCase().includes(lowerCaseQuery) ) : usersPanel;
    return (
      <Grid container>
        <AdminInfoPanel 
          admin={admin} 
          users={usersPanel}
        />
        <SearchDisablePanel 
          query={query} 
          clearSelected={this.handleClearSelected} 
          changeQueryState={this.handleChangeQueryState}
          selected={selected}  
          disableUser={this.props.handleDisableUser} 
        />
        <DashboardTable
          users={users}
          selected={selected}
          handleClick={this.handleClick}
          handleStatusChange={this.props.handleStatusChange}
          handleSelectAllClick={ this.handleSelectAllClick}
        />        
        <Grid item xs={12} className="dashboard_footer">
          <div>© Lv-330 Node.js, 2018</div>
        </Grid>
      </Grid>
    );
  };

  handleClearSelected = () => {
    this.setState({ selected: [] });
  };

  handleChangeQueryState = (e) => {
    this.setState({ query: e.target.value });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    switch(selectedIndex) {
      case -1 : 
        newSelected = newSelected.concat(selected, id);
        break;
      case 0 : 
        newSelected = newSelected.concat(selected.slice(1));
        break;
      case selected.length - 1 :
        newSelected = newSelected.concat(selected.slice(0, -1));
        break;
      default : 
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
    };
    this.setState({ selected: newSelected });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: this.props.users.filter(user => { return user.isAdmin === false } ).map(user => user._id) }));
      return;
    };
    this.setState({ selected: [] });
  };
};

export default DashboardFrame;
