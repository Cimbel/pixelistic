import React from 'react';

import { Button } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

export const UpstairsBtn = () => {
  return <Button
    className={"upstairs-btn"}
    variant={"outlined"}
  > 
    <KeyboardArrowUp />
  </Button>
};

export default UpstairsBtn;
