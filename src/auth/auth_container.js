import React from "react";
import { Navbar } from "react-bootstrap"
import { Mutation } from "react-apollo";
import SignUpForm from "./sign_up_form";
import LogInForm from "./login_form";
import { SIGN_UP_USER, LOGIN_USER } from '../actions';
import { ErrorMessage, TwitterSignIn } from '../components';
import { requestProvider } from 'webln'
import RekrExplained from '../green-rekr-explained.png';

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
        <div className="auth-container row">
          <div id="auth-left" className="col-sm-6">
            <h1>Rekr helps both
            <br></br>Podcast <strong>Creators</strong> & <br></br>Podcast <strong>Listeners</strong></h1>
            <h1><strong> Stack Sats </strong></h1>
            <img src={RekrExplained} width={"450px"}/>
          </div>
          <div id="auth-right" className="col-sm-6">
            {warning ? <div id="auth-warning" className="error nice-error" >You must sign up before you can do that action.</div> : null}
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
      </div>
    )
  }
}

export default AuthContainer;
