import React from 'react';
import { TextField } from 'material-ui';

const Register = (props) => {
  const { show, loading, inputChange, firstName, lastName } = props;
  return (
    <div>
      <TextField
        hintText="First Name"
        style={{ display: show }}
        floatingLabelText="Please Enter First Name"
        disabled={loading}
        onChange={(event, value) => inputChange({ prop: 'firstName', value })}
        value={firstName}
      />
      <br />
      <TextField
        hintText="Last Name"
        disabled={loading}
        style={{ display: show }}
        floatingLabelText="Please Enter Your Last Name"
        onChange={(event, value) => inputChange({ prop: 'lastName', value })}
        value={lastName}
      />
      <br />
    </div>
  );
};

export default Register;
