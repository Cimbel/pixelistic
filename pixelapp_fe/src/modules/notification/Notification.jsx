import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Badge, Button, ClickAwayListener, Divider, Grid, Grow, Paper, Popper, Typography} from '@material-ui/core';
import { Notifications } from '@material-ui/icons';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <Grid item xs={1} container >
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <Badge badgeContent={3} color="secondary">
             <Notifications className="notifications-icon" fontSize={'inherit'} />
            </Badge>
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper className="notifWidth">
                  <ClickAwayListener onClickAway={this.handleClose}>
                  <div>
                    <div className="notif-item-container">
                      <div className="notif-item-avatar">
                      <Avatar
                        alt="Adelle Charles"
                        src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                        className="itemPad"
                        />
                      </div>
                      <div className="notif-sub-container">
                        <div className="notif-item-username">
                          <Typography variant="subheading" gutterBottom>
                          qvestyara
                          </Typography>
                        </div>
                        <div className="notif-item-action">
                          <Typography variant="caption" gutterBottom>
                            Add new post
                          </Typography>
                        </div>
                      </div>
                      <div className="notif-sub-container-2">
                        <div className="notif-item-time">
                        <Typography variant="caption" gutterBottom>
                            12:19
                          </Typography>
                        </div>
                        <div className="notif-item-date">
                        <Typography variant="caption" gutterBottom>
                            20.08.2018
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <div className="notif-item-container">
                      <div className="notif-item-avatar">
                      <Avatar
                        alt="Adelle Charles"
                        src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                        className="itemPad"
                        />
                      </div>
                      <div className="notif-sub-container">
                        <div className="notif-item-username">
                          <Typography variant="subheading" gutterBottom>
                          Carbonid1
                          </Typography>
                        </div>
                        <div className="notif-item-action">
                          <Typography variant="caption" gutterBottom>
                            Add new post
                          </Typography>
                        </div>
                      </div>
                      <div className="notif-sub-container-2">
                        <div className="notif-item-time">
                        <Typography variant="caption" gutterBottom>
                            22:47
                          </Typography>
                        </div>
                        <div className="notif-item-date">
                        <Typography variant="caption" gutterBottom>
                            19.08.2018
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <div className="notif-item-container">
                      <div className="notif-item-avatar">
                      <Avatar
                        alt="Adelle Charles"
                        src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                        className="itemPad"
                        />
                      </div>
                      <div className="notif-sub-container">
                        <div className="notif-item-username">
                          <Typography variant="subheading" gutterBottom>
                          User333
                          </Typography>
                        </div>
                        <div className="notif-item-action">
                          <Typography variant="caption" gutterBottom>
                            Add new post
                          </Typography>
                        </div>
                      </div>
                      <div className="notif-sub-container-2">
                        <div className="notif-item-time">
                        <Typography variant="caption" gutterBottom>
                            14:21
                          </Typography>
                        </div>
                        <div className="notif-item-date">
                        <Typography variant="caption" gutterBottom>
                            18.08.2018
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>

                    {/* <Grid container alignItems="center" justify="flex-start" direction="row"  className="allPad">
                      <Avatar
                        alt="Adelle Charles"
                        src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                        className="itemPad"
                        />
                      <Grid container alignItems="center" justify="flex-start" direction="row" className="itemPad">
                        <Typography variant="subheading" gutterBottom>
                          qvestayra
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Add new post
                        </Typography>
                      </Grid>
                      <Grid container alignItems="center" justify="flex-start" direction="row"  >
                        <Typography variant="caption" gutterBottom>
                          12:19
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          20.08.2018
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider /> 
                    <Grid container alignItems="center" justify="flex-start" direction="row"  className="allPad">
                      <Avatar
                        alt="Adelle Charles"
                        src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                        className="itemPad"
                        />
                      <Grid alignItems="center" justify="flex-start" direction="row" className="itemPad">
                        <Typography variant="subheading" gutterBottom>
                          Carbonid1
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Follow you
                        </Typography>
                      </Grid>
                      <Grid alignItems="center" justify="flex-start" direction="row" className="itemMar" >
                        <Typography variant="caption" gutterBottom>
                          09:41
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          20.08.2018
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container alignItems="center" justify="flex-start" direction="row"  className="allPad">
                      <Avatar
                        alt="Adelle Charles"
                        src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                        className="itemPad"
                        />
                      <Grid alignItems="center" justify="flex-start" direction="row" className="itemPad">
                        <Typography variant="subheading" gutterBottom>
                          qvestayra
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Add new post
                        </Typography>
                      </Grid>
                      <Grid alignItems="center" justify="flex-start" direction="row" className="itemMar" >
                        <Typography variant="caption" gutterBottom>
                          12:23
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          19.08.2018
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider /> */}
                    
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
      </Grid>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object,
};

export default Notification;
