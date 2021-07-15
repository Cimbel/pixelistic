import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow, Checkbox, FormControlLabel, Switch, TablePagination, TableFooter } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DashboardPagination from './DashboardPagination';
import DashboardTableHead from './DashboardTableHead';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

const styles = theme => ({
  colorSwitchBase: {
    color: '#f71c6ad9',
    '&$colorChecked': {
      color: '#4dc794',
      '& + $colorBar': {
        backgroundColor: '#4dc794',
      },
    },   
  },
  colorBar: {},
  colorChecked: {},
  colorDisabled: 'grey'
});

class DashboardTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'nickname',
      page: 0,
      rowsPerPage: 5
    }
  };
  render() {
    const { rowsPerPage, page, order, orderBy } = this.state;
    const { users, handleClick, handleStatusChange, selected, classes, handleSelectAllClick } = this.props;
    return (
      <Table className="dashboard_table">   
        <DashboardTableHead 
          users={users}
          selectedCount={selected.length}  
          rowsCount={users.length}
          handleSelectAll={handleSelectAllClick}
          order={order}
          orderBy={orderBy}
          onRequestSort={this.handleRequestSort}
        />
        <TableBody>
          { users.sort(this.getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(user => {
            const isSelected = this.isSelected(user._id);
            return (
              <TableRow 
                key={user._id} 
                hover
                selected={isSelected}
                className={user.disabled ? 'dashboard_disabled-row' : ''}
              >
                <TableCell padding="checkbox">
                  <Checkbox 
                    color="primary" 
                    disabled={user.disabled}
                    checked={isSelected} 
                    onClick={event => handleClick(event, user._id)}
                  />
                </TableCell>
                <TableCell>
                  <Link to={"/profile/"+user.nickname} target="_blank" className="underline-effect">
                    {user.nickname}
                  </Link> 
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.posts.length}</TableCell>
                <TableCell>{user.followers.length}</TableCell>
                <TableCell className="dashboard_status-cell">  
                  <FormControlLabel
                    control={ 
                      <Switch
                        className="dashboard_switch"
                        disabled={user.disabled}
                        checked={user.isActive}
                        onChange={handleStatusChange}
                        value={user._id}
                        classes={ user.disabled ? { bar: classes.colorDisabled} :
                          { switchBase: classes.colorSwitchBase,
                          checked: classes.colorChecked,
                          bar: classes.colorBar }
                        }
                      /> }        
                    label = {user.isActive ? 'Active' : 'Suspended' }
                  /> 
                </TableCell>
                <TableCell className="dashboard_disabled-cell">
                  {user.disabled ? <RemoveCircleIcon className="dashboard_disabled-icon" /> : '' }
                </TableCell>
              </TableRow> 
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination className="dashboard-pagination" colSpan={7}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={DashboardPagination}
            />
          </TableRow>
        </TableFooter>
      </Table> 
    );
  };

  isSelected = id => this.props.selected.indexOf(id) !== -1;
          
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    };
    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  desc = (a, b, orderBy) => {
    if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) 
      return -1;
    if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) 
      return 1;
    return 0;
  };
  
  getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  };

}
        
export default withStyles(styles)(DashboardTable);
