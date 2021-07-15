import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import SignIn from './modules/sign-in/SignIn';
import SignUp from './modules/sign-up/SignUp';
import Feed from './modules/feed/Feed';
import EmailVerify from './modules/email-verify/EmailVerify';
import UserPage from './modules/user-page/UserPage';
import EditProfile from './modules/edit-profile/EditProfile';
import UploadPhoto from './modules/upload-photo/UploadPhoto';
import ForgotPassword from './modules/forgot/Forgot';
import ChangePassword from './modules/change-password/ChangePassword'
import MainLayout from './modules/main-layout/MainLayout';
import AuthLayout from './modules/auth-layout/AuthLayout';
import AdminPage from './modules/admin-page/AdminPage';
import DisabledAccountPage from './modules/disabled-account-page/DisabledAccountPage';

const Routes = (
  <BrowserRouter basename="/">
    <Switch>
      <AuthLayout exact path="/sign-in" component={SignIn}/>
      <AuthLayout exact path='/sign-up' component={SignUp} />
      <AuthLayout path='/verify' component={EmailVerify} />
      <AuthLayout path='/forgot' component={ForgotPassword} />
      <AuthLayout path='/change' component={ChangePassword} />
      <AuthLayout path='/disabled-account' component={DisabledAccountPage}/>

      <MainLayout exact path="/" component={Feed}/> 
      <MainLayout exact path='/edit-profile/:nickname' component={EditProfile} />
      <MainLayout exact path='/profile/:nickname'  component={UserPage} />
      <MainLayout exact path='/upload' component={UploadPhoto}/>
      <MainLayout exact path='/dashboard' component={AdminPage}/>
      <Redirect path="*" to="/sign-in" />

    </Switch>
  </BrowserRouter>
);

export default Routes;
