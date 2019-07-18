import React from "react";
import egg from "../egg.jpg";
import { Stream } from ".";

export default class UserNav extends React.Component {
  state = {
    tab: "reks"
  }

  render() {
    const { tab } = this.state;
    console.log(tab)
    return(
      <div>
        <div id="user-nav">
          {['reks', 'bookmarks', 'following', 'followers'].map((_tab_, i) => {
            const current = _tab_ === tab;
            return(
              <div key={i} className={`user-nav-tab ${current ? 'current-user-nav-tab' : null}`} onClick={() => { this.setState({ tab: _tab_ })}}>
                {capitalize(_tab_)}
              </div>
            )
          })}
          <div className="btn btn-secondary follow-btn">Follow</div>
          <img src={egg} id="user-profile-avatar" alt={"avatar"} />
        </div>
        <Stream feed={this.props[tab]} type={tab} />
      </div>
    )
  }
}

function capitalize(string) {
  const split = string.split('')
  split[0] = split[0].toUpperCase();
  return split.join('')
}
