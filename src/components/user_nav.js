import React from "react";
import Rek from "./rek";
import User from "./user";
import Episode from "./episode"
import createStream from "./stream";
import FollowButton from "./follow_button";
import Wallet from "./wallet.js";
import ImageEditor from "./image_editor";
import {
  REK_STREAM,
  FOLLOWING_STREAM,
  FOLLOWER_STREAM,
  BOOKMARK_STREAM } from "../actions";

const tabs = ['reks', 'bookmarks', 'following', 'followers'];

const tabMap = {
  reks: {
    component: Rek,
    query: REK_STREAM
  },
  following: {
    component: User,
    query: FOLLOWING_STREAM
  },
  followers: {
    component: User,
    query: FOLLOWER_STREAM
  },
  bookmarks: {
    component: Episode,
    query: BOOKMARK_STREAM
  }
}


export default class UserNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
    if (tabs.includes(this.props.tab)) {
      this.state.tab = this.props.tab
    } else {
      this.state.tab = this.props.current ? "satoshis" : "reks";
    }
  }


  editAvatar = () => {
    document.getElementById('avatar-input').click()
  }

  handleFileUpload = ({ target }) => {
    this.setState({
      image: target.files[0]
    })
  }

  removeFile = () => {
    this.setState({
      image: null
    })
  }

  render() {
    const { tab } = this.state;
    const onSats = tab === "satoshis";
    const { component, query } = tabMap[tab] || {};
    const Stream = createStream(component);

    return(
      <div>
        <div className="sub-nav-wrapper">
          <div className="sub-nav">
            {this.props.current ?
              <div className={`sub-nav-tab sub-nav-sats ${onSats ? 'current-sub-nav-tab' : null}`} onClick={() => { this.setState({ tab: "satoshis" })}} >
                <div className="text-center font-weight-bold">{this.props.satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                <div>Satoshis</div>
              </div>
              : null}
            {tabs.map((_tab_, i) => {
              const current = _tab_ === tab;
              return(
                <div key={i} className={`sub-nav-tab ${current ? 'current-sub-nav-tab' : null}`} onClick={() => { this.setState({ tab: _tab_ })}}>
                  <div className="text-center font-weight-bold">{this.props[_tab_].count.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                  <div>{capitalize(_tab_)}</div>
                </div>
              )
            })}
            <FollowButton current={this.props.current} userId={this.props.id} following={this.props.followedByCurrentUser} />
            <img
              src={this.props.profilePic}
              id="user-profile-avatar"
              className={`${this.props.current ? 'current-user-avatar' : null}`}
              alt={"avatar"}
              onClick={this.props.current ? this.editAvatar : null}
            />
            <div className="fa fa-pencil edit-avatar" />
            <input type="file" id="avatar-input" accept="image/jpeg,image/png,image/webp" onChange={this.handleFileUpload} />
          </div>
        </div>
        {onSats ?
          <Wallet satoshis={this.props.satoshis} id={this.props.id} />
          :  <Stream query={query} variables={{ userId: this.props.id }} />}
        {this.state.image ? <ImageEditor image={this.state.image} removeFile={this.removeFile} /> : null}
      </div>
    )
  }
}

function capitalize(string) {
  const split = string.split('')
  split[0] = split[0].toUpperCase();
  return split.join('')
}
