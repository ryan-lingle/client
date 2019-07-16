import React from "react";
import { Form } from "react-bootstrap"

const SignUpForm = (props) => {
  let email, username, password;

  return(
    <div>
      <h2>Sign Up</h2>
      <Form id="sign-up-form" onSubmit={(e) => {
        e.preventDefault();
        const variables = {
          email: email.value,
          username: username.value,
          password: password.value
        };
        props.logIn({ variables })
      }}>
        <Form.Group >
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Username" ref={node => { username = node }} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={node => { email = node }} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={node => { password = node }} />
        </Form.Group>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </div>
  )
}

export default SignUpForm;
