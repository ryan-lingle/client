import React from "react";
import { Navbar } from "react-bootstrap"
import SignUpForm from "./sign_up_form";
import LogInForm from "./login_form";
import { TwitterSignIn, Tooltip } from '../components';
import Rek from "../assets/rek.png";
import Logo from "../assets/logo.png";

class AuthContainer extends React.Component {
  state = {
    redirectToReferrer: false
  }

  handleLogIn = () => {
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
        <Navbar bg="white" expand="md" className="auth-nav">
          <Navbar.Brand href="/" className="text-primary rekr-brand">
            <img src={Logo} alt="rekr logo" />
          </Navbar.Brand>
          <LogInForm handleLogIn={this.handleLogIn} />
        </Navbar>
        <div className="auth-container row">
          <div id="auth-left" className="col-sm-6">
            <h1>This is a <Tooltip placement="right" tooltip="rek (n) 1. A public podcast donation. 2. A recommendation with skin in the game."><span className="dotted">rek</span></Tooltip>.</h1>
            <img src={Rek} style={{borderRadius: "5px"}} />
            <h1>It helps your favorite podcast creators stack sats and your fellow podcast listeners find great episodes.</h1>
            <br></br>
            <h1>So start making reks :)</h1>

          </div>
          <div id="auth-right" className="col-sm-6">
            {warning ? <div id="auth-warning" className="error nice-error" >You must sign up before you can do that.</div> : null}
            <div id="sign-in-btns">
              <TwitterSignIn />
            </div>
            <div className="auth-form-container">
              <SignUpForm handleLogIn={this.handleLogIn} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AuthContainer;
