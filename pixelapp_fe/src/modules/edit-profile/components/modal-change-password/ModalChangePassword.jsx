import React from 'react';
import { connect } from 'react-redux';

import { Grid, FormControl, Input, InputLabel, Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import { FormError } from '../../../../shared/components/form-error/FormError';
import { userChangePassword } from './../../../../actions/profile';

export class ModalChangePassword extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConf: '',
      oldPasswordValid: true,
      newPasswordValid: true,
      newPasswordConfValid: true,
      formErrors: { oldPassword: '', newPassword: '', newPasswordConf: '' }
    }
  }
  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
      >
        <div className='modal-change-password'>
          <form className='form-modal' onSubmit={this.handleSubmit}>
            <FormControl className='mar-top' margin="normal" fullWidth>
              <InputLabel htmlFor="inp-old-password">Old password</InputLabel>
              <Input required
                id="inp-old-password"
                type="password"
                name="oldPassword"
                onChange={this.oldPassword}
                onBlur={this.onBlur}
              />
              <FormError formErrors={this.state.formErrors.oldPassword} />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="inp-new-password">New password</InputLabel>
              <Input required
                id="inp-new-password"
                type="password"
                name="newPassword"
                onChange={this.onChangePassword}
                onBlur={this.onBlur}
              />
              <FormError formErrors={this.state.formErrors.newPassword} />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="inp-new-confirm">Confirm Password</InputLabel>
              <Input required
                id="inp-new-confirm"
                type="password"
                name="newPasswordConf"
                onChange={this.onChangePasswordConf}
              />
              <FormError formErrors={this.state.formErrors.newPasswordConf} />
            </FormControl>
            <p className={this.props.errorMessage ? 'err-msg' : 'msg'}>{this.props.errorMessage || this.props.successMsg}</p>
            <Grid container className='mar-top-btn' spacing={8} alignItems={"center"} justify={"center"} direction={"row"}>
              <Grid item>
                <Button
                  className="save-cancel-btn"
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={!this.buttonEnabled()}
                >
                  SAVE
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={this.onHandleClose}
                  className="save-cancel-btn"
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    )
  }

  onHandleClose = () => {
    this.setState( { formErrors: { oldPassword: '', newPassword: '', newPasswordConf: '' } } );
    this.props.handleClose()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.userChangePassword(this.props.userId, this.state.oldPassword, this.state.newPassword, this.state.newPasswordConf);
  }
  oldPassword = (e) => {
    this.setState(
      { [e.target.name]: e.target.value }
    );
  };

  onChangePassword = (e) => {
    this.setState(
      { 'newPassword': e.target.value },
      () => {
        if (this.state.newPasswordConf)
          this.validateField('newPasswordConf', this.state.newPasswordConf)
      }
    );
  };

  onChangePasswordConf = (e) => {
    const name = e.target.name;
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
    let oldPasswordValid = this.state.oldPasswordValid;
    let newPasswordValid = this.state.newPasswordValid;
    let newPasswordConfValid = this.state.newPasswordConfValid;

    switch (fieldName) {
      case 'oldPassword':
        oldPasswordValid = value.length >= 6;
        fieldValidationErrors.oldPassword = oldPasswordValid ? '' : 'Password must be at least 6 characters long';
        break;
      case 'newPassword':
        newPasswordValid = value.length >= 6;
        fieldValidationErrors.newPassword = newPasswordValid ? '' : 'Password must be at least 6 characters long';
        break;
      case 'newPasswordConf':
        newPasswordConfValid = value === this.state.newPassword;
        fieldValidationErrors.newPasswordConf = newPasswordConfValid ? '' : 'Passwords don\'t match';
        break;
      default:
        break;
    };
    this.setState({ formErrors: fieldValidationErrors, oldPasswordValid, newPasswordValid, newPasswordConfValid });
  };

  buttonEnabled = () => {
    return this.state.oldPassword.length > 0 && this.state.newPassword.length > 0 && this.state.newPasswordValid &&
      this.state.newPasswordConf.length && this.state.newPasswordConfValid;
  };

};

export default connect(
  state => ({
    errorMessage: state.users.errorMessage,
    successMsg: state.users.successMsg
  }),
  dispatch => ({
    userChangePassword: (_id, oldPassword, newPassword, newPasswordConf) => dispatch(userChangePassword(_id, oldPassword, newPassword, newPasswordConf))
  })
)(ModalChangePassword)
