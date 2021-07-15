import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import PassportBtn from '../passport-btn/PassportBtn';
import { facebookId } from '../../../const/social-auth-config';

export class FbAuth extends Component {
  render() {
    return <FacebookLogin
      appId={facebookId}
      callback={this.responseFacebook}
      fields="name,email,picture"
      render={renderProps => <PassportBtn onClick={renderProps.onClick} name="facebook" />}
    />
  }

  responseFacebook = res => {
    if (!res.id) return;
    return this.props.handleFb(res);
  }
};

FbAuth.propTypes = {
  handleFb: PropTypes.func.isRequired
};

export default FbAuth;
