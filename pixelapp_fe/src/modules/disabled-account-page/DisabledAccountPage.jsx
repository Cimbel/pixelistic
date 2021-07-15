import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

const DisabledAccountPage = props => {
  return (
    <Grid container justify='center' className='disabled-page'>
      <Grid item xs={4} >
        <Paper className='disabled-page_container'>
          <Typography variant="subheading">Your account has been permanently disabled for violating the Terms of Use.</Typography>
        </Paper>
      </Grid>
    </Grid>

  );
};

export default DisabledAccountPage;
