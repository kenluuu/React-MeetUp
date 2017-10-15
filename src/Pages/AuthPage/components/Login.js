import React from 'react';
import { TextField } from 'material-ui';
const Login = (props) => {
  const {  email, password, inputChange, loading } = props;
  return (
    <div>
      <TextField
        hintText="Email"
        disabled={loading}
        floatingLabelText="Please Enter Your Email"
        onChange={(event, value) => inputChange({ prop: 'email', value })}
        value={email}
      />
      <br />
      <TextField
        hintText="Password"
        disabled={loading}
        type="password"
        floatingLabelText="Please Enter Your Password"
        onChange={(event, value) => inputChange({ prop: 'password', value })}
        value={password}
      />
    </div>
  );
};

export default Login;
