import React from "react";
import { CONFIRM_EMAIL } from "../actions";
import { ErrorMessage, Loader } from "../components";
import { Mutation } from "react-apollo";

export default class ConfirmEmail extends React.Component {
  state = {
    res: null,
    type: null,
  }

  onCompleted = ({ confirmEmail }) => {
    if (confirmEmail.user) {
      this.setState({ res: confirmEmail.user, type: "user" });
    } else if (confirmEmail.podcast) {
      this.setState({ res: confirmEmail.podcast, type: "podcast" });
    }
  }

  componentDidMount() {
    this.confirmEmail({ variables: this.props.match.params })
  }

  render() {
    const { res } = this.state;
    return(
      <Mutation mutation={CONFIRM_EMAIL} onCompleted={this.onCompleted} >
        {(confirmEmail, { error }) => {
          this.confirmEmail = confirmEmail;
          console.log(error)
          if (error) return <ErrorMessage error={error} />;
          if (!res) return <Loader />;
          return(
            <div id="confirm-email">
              <h1>Your email has been confirmed.</h1>
              <br></br>
              <a href="/">Check out your Feed</a>
            </div>
          )
        }}
      </Mutation>
    )
  }
}
