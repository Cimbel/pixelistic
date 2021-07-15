import React from 'react';
import { Grid, Button, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import { Extension } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Notification from '../../../modules/notification/Notification'
import { Search } from './components/search/Search';

export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false};
  }

  render() {
    return (
      <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
          <Grid container className="header" item xs={12} alignItems = {"center"}>
              <Grid item xs={1}> </Grid> 
              <Link className="logo-link" to="/">
                <Grid className="logo" item xs={2}>
                  <span className="logo-ident">Pixel</span>
                </Grid>
              </Link>
              <Grid item xs={3}></ Grid>
              <Grid item xs={1}>
                <Search />
              </Grid>
              <Grid item xs={3} ></Grid>
              <Notification />
              <ClickAwayListener onClickAway={this.handleClose}>
              <div>
              <Grid item xs={1}>
                <Button
                  className="menu-btn"
                  onClick={this.openWindow}
                >
                  <Extension className="extension-icon" fontSize={'inherit'} />
                </Button>
                </Grid>
                

                    <Paper 
                      className='menu-list' 
                      style={{display: this.state.open ? 'block' : 'none' }}
                    >
            
                          <MenuList onClick={this.handleClose}>
                            <Link to={`/profile/${this.props.user.nickname}`}>
                              <MenuItem>
                                Profile
                              </MenuItem>
                            </Link>
                            <Link to="/">
                              <MenuItem onClick={this.handleClose}>
                                Feed line
                              </MenuItem>
                            </Link>
                            <Link to="/upload">
                              <MenuItem onClick={this.handleClose}>
                                Add a post
                              </MenuItem>
                            </Link>
                            { this.props.user.isAdmin ? 
                            <Link to={"/dashboard"}>
                              <MenuItem onClick={this.handleClose}>
                                Dashboard
                              </MenuItem>
                            </Link> : '' }   
                            <MenuItem onClick={this.props.onSignOut}>
                              Sign Out
                            </MenuItem>                        
                          </MenuList>
                      
                    </Paper>  
                    </div>
                  </ClickAwayListener>              
              </Grid>
          </Grid>

    )
  }
  openWindow = () => {
    this.setState({open : !this.state.open});
  };

  handleClose = () => {
    this.setState({ open: false });
  };
};

export default Header;

