import React from 'react';
import { CircularProgress }  from '@material-ui/core';

export const LoadingSpinner = (props) => {
    return <div className ="loading-spinner">
        <CircularProgress className="spinner" size={ props.size || 50}/>
    </div>
};
export default LoadingSpinner;
