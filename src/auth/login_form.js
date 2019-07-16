import React from "react";
import { Form } from "react-bootstrap"

const SignUpForm = (props) => {
  let username, password;

  return(
    <Form inline className="login-inline" onSubmit={(e) => {
        e.preventDefault();
        const variables = {
          username: username.value,
          password: password.value
        };
        props.logIn({ variables })
      }}>
      <Form.Control
        type="text"
        placeholder="Username"
        className="mr-sm-2"
        ref={node => { username = node }}
      />
      <Form.Control
        type="text"
        placeholder="Password"
        className="mr-sm-2"
        ref={node => { password = node }}
      />
      <button className="btn btn-primary">Login</button>
    </Form>
  )
}

export default SignUpForm;
