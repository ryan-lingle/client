import React from "react";
import { Navbar } from "react-bootstrap"
import { Mutation } from "react-apollo";
import SignUpForm from "./sign_up_form";
import LogInForm from "./login_form";
import { SIGN_UP_USER, LOGIN_USER } from '../actions';
import { ErrorMessage, TwitterSignIn } from '../components';
import { requestProvider } from 'webln'


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
    localStorage.setItem('hasPodcast', data.hasPodcast);
    try {
      window.location.href = this.props.location.state.from;
    } catch {
      window.location.href = "/";
    }
  }

  async componentDidMount() {
    try {
      const webln = await requestProvider();
      console.log(webln);
    } catch(err) {
      console.log(err);
    }
  }



  render() {
    const warning = this.props.location.search.split('warning=')[1];
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
        {warning ? <div id="auth-warning" className="error" >You must be logged in to do that.</div> : null}
        <div className="container">
          <div id="sign-in-btns">
            <TwitterSignIn />
          </div>
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
