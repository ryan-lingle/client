import React from "react";
import { Mutation } from "react-apollo";
import { TOGGLE_FOLLOW } from "../actions";

export default class FollowButton extends React.Component {

  state = {
    following: this.props.following
  }

  enter = ({ target }) => {
    target.innerHTML = "Unfollow";
  }

  leave = ({ target }) => {
    target.innerHTML = "Following";
  }

  toggle = ({ toggleFollow }) => {
    this.setState({ following: toggleFollow })
  }

  render() {
    if (this.props.current) {
      return(<div className="follow-btn"></div>)
    }

    const userId = parseInt(this.props.userId);

    if (!this.state.following) {
      return(
        <Mutation mutation={TOGGLE_FOLLOW} onCompleted={this.toggle} >
          {(toggleFollow, { error }) => (
            <div onClick={() => toggleFollow({ variables: { userId } })} className="btn btn-secondary follow-btn">Follow</div>
          )}
        </Mutation>
      )
    } else {
      return(
        <Mutation mutation={TOGGLE_FOLLOW} onCompleted={this.toggle} >
          {(toggleFollow, { error }) => (
            <div onClick={() => toggleFollow({ variables: { userId } })} onMouseEnter={this.enter} onMouseLeave={this.leave} className="btn btn-primary follow-btn unfollow-btn">Following</div>
          )}
        </Mutation>
      )
    }

  }
};
