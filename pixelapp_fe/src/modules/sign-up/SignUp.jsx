import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { authSignUp, authSignInSocial } from './../../actions/auth';

import { FormError } from '../../shared/components/form-error/FormError';
import InputEmail  from '../../shared/components/input-email/InputEmail';
import FbAuth from '../../shared/components/fb-auth/FbAuth';
import GoogleAuth from '../../shared/components/google-auth/GoogleAuth';

import { Grid, FormControl, Typography, Input, Button, InputLabel } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';

export class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      nickname: '',
      email: '',
      password: '',
      passwordConf: '',
      formErrors: { nickname: '',  password: '',  passwordConf: ''},
      nicknameValid: true,
      emailValid: true,
      passwordValid: true,
      passwordConfValid: true,
      accessToken: false 
    };
  };
  
  componentWillMount(){
    let accessToken = window.localStorage.getItem('authHeaders')  ? 
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : null;
    this.setState({ accessToken });
  }

  render () {
    if (this.props.isAuthorized || this.state.accessToken) {
      return <Redirect to='/' />;
    }

    if(!this.state.accessToken && !this.props.isAuthorized){
      return <Grid container alignItems="center" justify="center" direction="column">
        <div className="sign-up">
          <Grid className="signup-container" container justify="center">
            <Grid item xs={8} container justify="flex-start" direction="column">
              <h1>Pixel</h1>
              <p className="intro-text light-grey">
                Sign up to see photos from your friends
              </p>
              <form onSubmit={this.onSubmit}>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="inp-nickname">Nickname</InputLabel>
                  <Input required 
                    id="inp-nickname" 
                    type="text"
                    name="nickname" 
                    onChange={this.onChange} 
                    onBlur={this.onBlur}
                  />
                  <FormError formErrors={this.state.formErrors.nickname}/>
                </FormControl>
                  <InputEmail
                    onChange={this.onChange} 
                    onValidate={this.onValidate} 
                  /> 
                  { this.state.emailValid ? '' : <div className="form-error">Email is invalid</div> }
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="inp-password">Password</InputLabel>
                  <Input required 
                    id="inp-password" 
                    type="password"
                    name="password" 
                    onChange={this.onChangePassword}
                    onBlur={this.onBlur}
                  />
                  <FormError formErrors={this.state.formErrors.password}/>
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="inp-confirm">Confirm Password</InputLabel>
                  <Input required 
                    id="inp-confirm" 
                    type="password"
                    name="passwordConf" 
                    onChange={this.onChangePasswordConf}
                  />
                  <FormError formErrors={this.state.formErrors.passwordConf}/>
                </FormControl>
                <p className={this.props.errMsg ? 'err-msg msg' : 'msg'}>{this.props.errMsg || this.props.confMsg}</p>
                <Button 
                  className="submit-btn" 
                  type="submit"
                  color="primary"
                  variant="contained" 
                  fullWidth
                  disabled={this.props.confMsg ? 'true' : !this.buttonEnabled()}
                >
                  <PersonAdd className="add-icon"/>
                  Sign Up
                </Button>
              </form>

              <p className="divider light-grey">OR</p>

              <GoogleAuth 
                handleGoogle={this.handleSocial}
              />
              <FbAuth 
                handleFb={this.handleSocial}
              />
            </Grid>
          </Grid>
          <Grid className="login-container_link" item xs={12} container justify="center">
            <Typography>
              Have an account?
              <Link to="/sign-in" className="sign-in-link"> Sign in</Link>
            </Typography>
          </Grid>
        </div>
      </Grid>
    }
  };

  onChange = (e) => {
    this.setState(
      { [e.target.name]: e.target.value }
    );
  };

  onChangePassword = (e) => {
    this.setState( 
      { 'password': e.target.value }, 
      () => {  if (this.state.passwordConf) 
        this.validateField('passwordConf', this.state.passwordConf) 
      } 
    );
  };

  onChangePasswordConf = (e) => {
    const name =  e.target.name;
    const value = e.target.value;
    this.setState(
      { [name]: value }, () => { this.validateField(name, value) }
    );
  };

  onBlur = (e) => {   
    this.validateField(e.target.name, e.target.value);
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let nicknameValid = this.state.nicknameValid;
    let passwordValid = this.state.passwordValid;
    let passwordConfValid = this.state.passwordConfValid;
    
    switch (fieldName) {
      case 'nickname':
        nicknameValid = value.match(/^[A-Za-z][A-Za-z0-9_]{5,15}$/);
        fieldValidationErrors.nickname = nicknameValid ? '' : (value.length > 15) ? 'Nickname must be less than 15 characters' : 'Nickname must contain only letters, numbers and/or underline charachter'
        break; 
      case 'password':
        passwordValid = value.length >= 6;     
        fieldValidationErrors.password = passwordValid ? '' : 'Password must be at least 6 characters long';
        break;
      case 'passwordConf':
        passwordConfValid = value === this.state.password;  
        fieldValidationErrors.passwordConf = passwordConfValid ? '' : 'Passwords don\'t match';
        break;
      default:
        break;      
    };
    this.setState( { formErrors: fieldValidationErrors, nicknameValid, passwordValid, passwordConfValid } );
  };
  
  buttonEnabled = () => {
    return this.state.nickname.length > 0 && this.state.nicknameValid && this.state.email.length > 0 && this.state.emailValid 
           && this.state.password.length > 0 && this.state.passwordValid && 
           this.state.passwordConf.length && this.state.passwordConfValid;
  };

  onValidate = (isValid, value) => {
    this.setState( { emailValid: isValid, email: value } )
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { nickname, email, password, passwordConf } = this.state;
    this.props.authSignUp(nickname, email, password, passwordConf);
  }

  handleSocial = (user) => {
    this.props.authSignInSocial(user);
  }
};

export default connect(
  state => ({
    isAuthorized: state.auth.isAuthorized,
    errMsg: state.auth.error,
    confMsg: state.auth.confMsg
  }),
  dispatch => ({
    authSignUp: (nickname, email, password, passwordConf) => dispatch(authSignUp(nickname, email, password, passwordConf)),
    authSignInSocial: (user) => dispatch(authSignInSocial(user))
  })
)(SignUp);

