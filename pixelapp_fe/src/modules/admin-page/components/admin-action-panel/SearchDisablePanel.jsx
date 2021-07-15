import React from 'react';
import { Grid, Input, Tooltip, IconButton, InputAdornment } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import SearchIcon from '@material-ui/icons/Search';

const SearchDisablePanel = props => {
  const { query, changeQueryState, selected, disableUser, clearSelected } = props;
  return (
    <Grid item xs={12} className="action-panel">
      <Input
        className="action-panel_search"
        value={query}
        onChange={changeQueryState}
        placeholder="Search by nickname"
        startAdornment={<InputAdornment position="start"><SearchIcon className="action-panel_search-icon"/></InputAdornment>}
      />
      {selected.length ? (
        <div className="action-panel_delete">
          <div>
            {selected.length} selected
          </div>
          <Tooltip title="Disable">
            <IconButton aria-label="Disable">
              <RemoveCircleIcon  onClick={event => { disableUser(event, selected); clearSelected() }} />
            </IconButton>
          </Tooltip>
        </div>
      ) : '' } 
    </Grid>
  );
};

export default SearchDisablePanel;
