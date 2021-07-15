import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid, FormControl,  Typography, Input, Button, InputLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FormError } from '../../shared/components/form-error/FormError';
import {authVerifyPasswordReset}  from './../../actions/auth';
import {authChangePassword}  from './../../actions/auth';

export class ChangePassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      passwordConf: '',
      formErrors: {   password: '',  passwordConf: ''},
      passwordValid: true,
      passwordConfValid: true,
      accessToken: false 
    };
    props.authVerifyPasswordReset(window.location.search);
  };
  
  componentWillMount(){
    let accessToken = window.localStorage.getItem('authHeaders')  ? 
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : null;
    this.setState({ accessToken });
  }

  render () {
    if (this.props.isAuthorized || this.state.accessToken) {
      return <Redirect to='/'/>;
    }
//if link is incorrect 
    if(this.props.forgotErrMsg){
        return(
            <Grid container alignItems="center" justify="center" direction="column">
              <div className="change">
              <Grid className="change-container" container justify="center">
                <Grid item xs={8} container justify="flex-start" direction="column">
                  <h1>Link is incorrect or expire. Please try again.</h1>
                    <Link className="reset_link" to="/forgot">
                        <Button className="forgot-submit-btn" color={"primary"} variant={"contained"} fullWidth>
                            Forgot password
                        </Button>
                    </Link>
                </Grid>
                <div className="change-container_link">
                  <Typography>
                    or you can
                  <Link to="/sign-in"> sign in</Link>
                  </Typography>
                </div>
              </Grid>
            </div>
          </Grid> 
        )
      //after password changing
    }else if(this.props.forgotConfMsg){
        return(
            <Grid container alignItems="center" justify="center" direction="column">
               <div className="change">
                <Grid className="change-container" container justify="center">
                  <Grid item xs={8} container justify="flex-start" direction="column">
                    <h1>Success</h1>
                    <p className={this.props.forgotErrMsg ? 'err-msg msg' : 'msg'}>
                        {this.props.forgotConfMsg ? 'Password was changed, please Sing-in.' : this.props.forgotErrMsg}
                    </p>
                    <Link className="reset_link" to="/sing-in">
                      <Button className="forgot-submit-btn" color={"primary"} variant={"contained"} fullWidth>
                        Sing-in
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
                </div>
            </Grid> 
          );
    }else{
      //change password
        return(
            <Grid container alignItems="center" justify="center" direction="column">
               <div className="change">
                <Grid className="change-container" container justify="center">
                  <Grid item xs={8} container justify="flex-start" direction="column">
                    <h1>Change password</h1>
                    <form onSubmit={this.handleSubmit}>
                      <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="inp-password">New password</InputLabel>
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
                        <InputLabel htmlFor="inp-confirm">Confirm password</InputLabel>
                        <Input required 
                          id="inp-confirm" 
                          type="password"
                          name="passwordConf" 
                          onChange={this.onChangePasswordConf}
                        />
                        <FormError formErrors={this.state.formErrors.passwordConf}/>
                      </FormControl>
                      <p className={this.props.forgotErrMsg ? 'err-msg' : 'msg'}>
                        {this.props.forgotConfMsg ? 'Password was changed, please Sing-in.' : this.props.forgotErrMsg}
                      </p>
                      <Button 
                        className="forgot-submit-btn" 
                        type="submit"
                        color="primary"
                        variant="contained" 
                        fullWidth
                        disabled={!this.buttonEnabled()}
                      >
                        Change password
                      </Button>
                    </form>
                  </Grid>
                </Grid>
              </div>
            </Grid> 
          );
    }        
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authChangePassword(this.state.password, this.state.passwordConf, window.location.search);
  }

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

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let passwordConfValid = this.state.passwordConfValid;
    
    switch (fieldName) {
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
    this.setState( { formErrors: fieldValidationErrors, passwordValid, passwordConfValid } );
  };
  
  buttonEnabled = () => {
    return this.state.password.length > 0 && this.state.passwordValid && 
           this.state.passwordConf.length && this.state.passwordConfValid;
  };
};

export default connect(
  state => ({
    isAuthorized: state.auth.isAuthorized,
    forgotErrMsg: state.auth.forgotErrMsg,
    forgotConfMsg: state.auth.forgotConfMsg
  }),
  dispatch => ({
    authVerifyPasswordReset: (reset) => dispatch(authVerifyPasswordReset(reset)),
    authChangePassword: (password, passwordConf, reset) => dispatch(authChangePassword(password, passwordConf, reset))
    }
  )
)(ChangePassword);
