import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

export const PassportBtn = (props) => {
  return <Button 
    fullWidth
    id="passport-btn" 
    className={`${props.name}-btn`} 
    type="button" 
    color="primary" 
    variant="contained"
    onClick={props.onClick}
  >
    <div className={`${props.name}-icon`}></div>
    Sign in with {props.name}
  </Button>
};

PassportBtn.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PassportBtn;
