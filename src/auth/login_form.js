import React from "react";

const SignUpForm = (props) => {
  let username, password;

  return(
    <form id="login-form" onSubmit={(e) => {
        e.preventDefault();
        const variables = {
          username: username.value,
          password: password.value
        };
        props.logIn({ variables })
      }}>
      <input
        className="form-control"
        type="text"
        placeholder="Username"
        ref={node => { username = node }}
      />
      <input
        className="form-control"
        type="password"
        placeholder="Password"
        ref={node => { password = node }}
      />
      <button className="btn btn-primary">Sign In</button>
    </form>
  )
}

export default SignUpForm;
