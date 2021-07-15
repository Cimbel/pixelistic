import React from 'react';
import { TableSortLabel, TableHead, TableRow, TableCell, Checkbox, Tooltip } from '@material-ui/core'

const DashboardTableHead = props => {
    const { selectedCount, rowsCount, handleSelectAll, order, orderBy, onRequestSort } = props;
    return (
      <TableHead>
        <TableRow className="dashboard_tablehead">
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={selectedCount && selectedCount < rowsCount}
              checked={selectedCount === rowsCount}
              onClick={event => handleSelectAll(event, event.target.checked)}
            />
          </TableCell>
          <TableCell className="dashboard_tablecell">
            <Tooltip 
              className="tooltip"
              title="Sort"
              placement= 'bottom-end' 
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === 'nickname'}
                direction={order}
                onClick={event => onRequestSort(event,'nickname')}
              >
                Nickname
              </TableSortLabel>
            </Tooltip>
          </TableCell>
          <TableCell className="dashboard_tablecell">Email</TableCell>
          <TableCell className="dashboard_tablecell">Number of posts</TableCell>
          <TableCell className="dashboard_tablecell">Number of subcribers</TableCell>
          <TableCell className="dashboard_tablecell dashboard_status-head">Status</TableCell>
          <TableCell className="dashboard_tablecell"></TableCell>
        </TableRow>
      </TableHead>
    );
  };

export default DashboardTableHead;
