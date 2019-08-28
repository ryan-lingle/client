import React from "react";
import { Navbar } from "react-bootstrap"
import { Mutation } from "react-apollo";
import SignUpForm from "./sign_up_form";
import LogInForm from "./login_form";
import { SIGN_UP_USER, LOGIN_USER } from '../actions';
import ErrorMessage from '../components/error_msg';

class AuthContainer extends React.Component {
  state = {
    redirectToReferrer: false
  }

  handleLogIn = ({ createUser, logIn }) => {
    const data = createUser || logIn;
    localStorage.setItem('id', data.id);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('profilePic', data.profilePic);
    localStorage.setItem('email', data.email);
    try {
      window.location.href = this.props.location.state.from;
    } catch {
      window.location.href = "/";
    }
  }

  render() {

    return (
      <div>
        <Navbar bg="white" expand="md">
          <Navbar.Brand href="/" className="text-primary">REKR</Navbar.Brand>
          <Mutation mutation={LOGIN_USER} onCompleted={this.handleLogIn} >
            {(logIn, { error }) => (
              <span className="login-inline">
                <LogInForm logIn={logIn} />
                <ErrorMessage
                  error={error}
                  position={{
                    top: "55px",
                    right: "70px"
                  }}
                />
              </span>
            )}
          </Mutation>
        </Navbar>
        <div className="container">
          {this.state.error
            ? <div>{this.state.error}</div>
            : null}
          <Mutation mutation={SIGN_UP_USER} onCompleted={this.handleLogIn} >
            {(logIn, { error }) => (
              <div>
                <ErrorMessage error={error} />
                <SignUpForm logIn={logIn} />
              </div>)
            }
          </Mutation>
        </div>
      </div>
    )
  }
}

export default AuthContainer;
