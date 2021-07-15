import React from 'react';
import { Typography, Grid, Popper, Button, Paper, Grow, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import { Extension } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authSignOut } from './../../../../actions/auth';

export class AdminPageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    const { open } = this.state;
    return (
      <Grid container alignItems="center" justify="space-between" className="admin-page-header">
        <Grid container item xs={5} direction="row">
          <Typography variant="subheading" className="admin-page-header_title" >
            Admin Dashboard 	
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            buttonRef={node => { this.anchorEl = node; }}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <Extension className="admin-page-header_menu-icon"/>
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <Link to={"/profile/"+this.props.user.nickname}>
                      <MenuItem>
                        Profile
                      </MenuItem>
                    </Link>
                    <Link to="/">
                      <MenuItem onClick={this.handleClose}>
                        Feed line
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={this.props.onSignOut}>Sign Out</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
            )}
          </Popper> 
        </Grid>
      </Grid>                
    )
  }

  handleToggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };
  
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

}

export default connect(
  state => ({
    user: state.auth.user
  }),
  dispatch => ({
    authSignOut: ( ) => dispatch(authSignOut( ))
  })
)(AdminPageHeader)
