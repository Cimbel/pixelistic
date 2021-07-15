import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Button, Input } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { authForgotEmail } from '../../actions/auth';


export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
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

  render () {
    if (this.props.isAuthorized || this.state.accessToken) {
      return <Redirect to='/' />;
    }
    return (
      <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
      <div className="forgot">
          <Grid className="forgot-container" container justify={"center"}>
            <Grid item xs={8} container alignItems={"center"} justify={"flex-start"} direction={"column"}>
              <h1>Reset password</h1>
                <form className="forgot-form" onSubmit={this.handleSubmit}>
                <Input required
                    fullWidth
                    placeholder="Enter Your email"
                    id="inp-email"
                    name="email"
                    type={"email"}
                    onChange={this.validate}/>
                <p className={this.props.forgotErrMsg ? 'forgot-err-msg' : 'forgot-msg'}>
                  {this.props.forgotErrMsg || this.props.forgotConfMsg}
                </p>
                <Button className="forgot-reset-btn" type={"submit"} color={"primary"} variant={"contained"} fullWidth disabled={this.props.forgotConfMsg ? true : false || !this.state.emailValid} >
                  <AccountCircle className="signin-icon" />
                  Reset
                </Button>
            </form>
            </Grid>
          </Grid>
        </div>
      </Grid>
    )
  }

  validate = (e) => {
    const value = e.target.value;
    let emailValid;
    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    this.onValidate(emailValid, value)
  };

  onValidate = (isValid, value) => {
    this.setState({ emailValid: isValid,  email: value });
    this.validateButtonState();
  }

  validateButtonState = () => {
    this.setState({ formValid: this.state.emailValid });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authForgotEmail(this.state.email);
  }
};

export default connect(
    state => ({
      isAuthorized: state.auth.isAuthorized,
      forgotErrMsg: state.auth.forgotErrMsg,
      forgotConfMsg: state.auth.forgotConfMsg
    }),
    dispatch => ({
        authForgotEmail: (email) => dispatch(authForgotEmail(email))
    }
    )
  )(ForgotPassword);
