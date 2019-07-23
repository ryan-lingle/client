import React from "react";
import egg from "../egg.jpg";
import { Stream } from ".";
import FollowButton from "./follow_button";
import Wallet from "./wallet.js"

export default class UserNav extends React.Component {
  state = {
    tab: "reks"
  }

  render() {
    const { tab } = this.state;
    const onSats = tab === "satoshis";
    return(
      <div>
        <div id="user-nav">
          {['reks', 'bookmarks', 'following', 'followers'].map((_tab_, i) => {
            const current = _tab_ === tab;
            return(
              <div key={i} className={`user-nav-tab ${current ? 'current-user-nav-tab' : null}`} onClick={() => { this.setState({ tab: _tab_ })}}>
                <div className="text-center font-weight-bold">{this.props[_tab_].count}</div>
                <div>{capitalize(_tab_)}</div>
              </div>
            )
          })}
          {this.props.current ?
            <div className={`user-nav-tab ${onSats ? 'current-user-nav-tab' : null}`} onClick={() => { this.setState({ tab: "satoshis" })}} >
              <div className="text-center font-weight-bold">{this.props.satoshis}</div>
              <div>Satoshis</div>
            </div>
            : null
          }
          <FollowButton userId={this.props.id} following={this.props.followedByCurrentUser} />
          <img src={egg} id="user-profile-avatar" alt={"avatar"} />
        </div>
        {onSats ?
          <Wallet satoshis={this.props.satoshis} id={this.props.id} />
          :  <Stream {...this.props[tab]} userId={this.props.id} type={tab} />
        }
      </div>
    )
  }
}

function capitalize(string) {
  const split = string.split('')
  split[0] = split[0].toUpperCase();
  return split.join('')
}
