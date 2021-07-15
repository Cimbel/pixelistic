import React from 'react';
import { connect } from 'react-redux';
import { authVerifyEmail } from './../../actions/auth';
import { Redirect } from 'react-router';

import { ErrorOutline } from '@material-ui/icons';

import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner'

const EmailVerify = (props) => {
    props.authVerifyEmail(window.location.search);

    if(props.user && !props.isAuthorized) 
      return <Redirect to="/sign-in"/>
  
    if(props.isAuthorized){
      return <Redirect to="/"/>
    }

    return (
      <div className="verify-page">
        <p className={props.error ? 'error':''}>{props.error ? 'Verification Failed' :'Redirecting ...'}</p>
        {props.error ?  (<ErrorOutline className="err-icon"/>)  : <LoadingSpinner/> }
      </div>
    )
}

export default connect(
  state => ({
    user: state.auth.user,
    errMsg: state.auth.errorMessage,
    error: state.auth.error,
    isAuthorized: state.auth.isAuthorized
  }),
  dispatch => ({
    authVerifyEmail: (hash) => dispatch(authVerifyEmail(hash))
  })
)(EmailVerify)
