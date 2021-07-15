import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

import PassportBtn from '../passport-btn/PassportBtn';
import { googleId } from '../../../const/social-auth-config';

export class GoogleAuth extends Component {
  render() {
    return <GoogleLogin
      clientId={googleId}
      onSuccess={this.responseGoogle}
      render={props => <PassportBtn onClick={props.onClick} name="google" />}
    />
  }

  responseGoogle = res => this.props.handleGoogle(res.profileObj);
};

GoogleAuth.propTypes = {
  handleGoogle: PropTypes.func.isRequired
};

export default GoogleAuth;
