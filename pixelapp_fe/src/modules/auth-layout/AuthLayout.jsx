import React from 'react';
import { Route } from 'react-router-dom';

export const AuthLayout = (props) =>{
  const { component: Component, ...rest } = props;
  return <Route {...rest} render={matchProps => (
    <div className="auth-layout">
      <Component {...matchProps} />
    </div>
  )} />
};

export default AuthLayout;
