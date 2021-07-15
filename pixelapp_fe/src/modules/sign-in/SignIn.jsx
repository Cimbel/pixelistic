import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authSignIn, authSignInSocial } from './../../actions/auth';

import { FormError } from '../../shared/components/form-error/FormError';
import InputEmail from '../../shared/components/input-email/InputEmail';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';
import FbAuth from '../../shared/components/fb-auth/FbAuth';
import GoogleAuth from '../../shared/components/google-auth/GoogleAuth';

import { Grid, Typography, FormControl, Input, Button, InputLabel } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { password: '', email: '' },
      passwordValid: false,
      emailValid: false,
      formValid: false,
      accessToken: false
    }
  }

  componentWillMount() {
    let accessToken = window.localStorage.getItem('authHeaders') ?
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : null;
     
    this.setState({ accessToken });
  }

  render() {  
    if (this.props.isAuthorized || this.state.accessToken) {
      return <Redirect to='/' />;
    }

    if(!this.state.accessToken && !this.props.isAuthorized){
      return <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
        <div className="sign-in">
          <Grid className="signin-container" container justify={"center"}>
            <Grid item xs={8} container alignItems={"center"} justify={"flex-start"} direction={"column"}>
              <h1>Pixel</h1>

              <form onSubmit={this.handleSubmit} className="form">
                <InputEmail 
                  onValidate={this.onValidate}
                  onChange={this.onChange} 
                />
                <FormError formErrors={this.state.formErrors.email} />

                <FormControl margin={"normal"} fullWidth>
                  <InputLabel htmlFor="inp-password">Password</InputLabel>
                  <Input
                    id="inp-password"
                    type="password"
                    name="password"
                    value={this.state.passsword}
                    onChange={this.onChangePassword}
                    required />
                </FormControl>
                <FormError formErrors={this.state.formErrors.password} />

                <p className={this.props.errMsg ? 'err-msg msg' : 'msg'}>
                  {this.props.errMsg}
                </p>

                <Button className="submit-btn" type={"submit"} color={"primary"} variant={"contained"} fullWidth disabled={!this.validateForm()}>
                  <AccountCircle className="signin-icon" />
                  Log In
                </Button>
              </form>

              <GoogleAuth 
                handleGoogle={this.handleSocial}
              />
              <FbAuth 
                handleFb={this.handleSocial}
              />

              <p>
                <Link className="reset_link" to="/forgot">Forgot password?</Link>
              </p>
            </Grid>
          </Grid>

          {/* Sign up link */}
          <div className="signup-container_link">
            <Typography>
              Don't have an account?
            <Link to="/sign-up" className="sign-up-link"> Sign up</Link>
            </Typography>
          </div>
        </div>
      </Grid>
    }

    return <LoadingSpinner/>
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangePassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  validateField = (fieldName) => {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case 'password':
        passwordValid = this.state.password.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : 'Password must be at least 6 characters long';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      passwordValid: passwordValid
    });
  }

  validateButtonState = () => {
    this.setState({ formValid: this.validateForm() });
  }

  validateForm = () => {
    return this.state.password.length > 0 && this.state.passwordValid && this.state.emailValid;
  }

  onValidate = (isValid, value) => {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.email = isValid ? '' : ' Email is invalid';
    this.setState({ emailValid: isValid, formErrors: fieldValidationErrors, email: value });
    this.validateButtonState();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authSignIn(this.state.email, this.state.password);
  }

  handleSocial = (user) => {
    this.props.authSignInSocial(user);
  }
};

export default connect(
  state => ({
    isAuthorized: state.auth.isAuthorized,
    errMsg: state.auth.errorMessage
  }),
  dispatch => ({
    authSignIn: (email, password) => dispatch(authSignIn(email, password)),
    authSignInSocial: (user) => dispatch(authSignInSocial(user))
  })
)(SignIn);

