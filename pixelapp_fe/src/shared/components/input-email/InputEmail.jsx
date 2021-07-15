import React from 'react';
import { FormControl, Input, InputLabel } from '@material-ui/core';

export default class InputEmail extends React.Component {

  render() {
    return (
      <FormControl margin={"normal"} fullWidth>
        <InputLabel htmlFor="inp-email">Email</InputLabel>
        <Input
          required
          id="inp-email"
          name="email"
          type={"email"}
          onBlur={this.validate}
          onChange={this.props.onChange}
        />
      </FormControl>
    )
  };

  validate = (e) => {
    const value = e.target.value;
    let emailValid;
    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    this.props.onValidate(emailValid, value)
  };

};

