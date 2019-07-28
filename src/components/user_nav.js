import React from "react";
import egg from "../egg.jpg";
import { Stream } from ".";
import FollowButton from "./follow_button";
import Wallet from "./wallet.js";
import ImageEditor from "./image_editor";

export default class UserNav extends React.Component {
  state = {
    tab: this.props.current ? "satoshis" : "reks",
    image: null
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
    return(
      <div>
        <div id="user-nav-wrapper">
          <div id="user-nav">
            {this.props.current ?
              <div className={`user-nav-tab ${onSats ? 'current-user-nav-tab' : null}`} onClick={() => { this.setState({ tab: "satoshis" })}} >
                <div className="text-center font-weight-bold">{this.props.satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                <div>Satoshis</div>
              </div>
              : null
            }
            {['reks', 'bookmarks', 'following', 'followers'].map((_tab_, i) => {
              const current = _tab_ === tab;
              return(
                <div key={i} className={`user-nav-tab ${current ? 'current-user-nav-tab' : null}`} onClick={() => { this.setState({ tab: _tab_ })}}>
                  <div className="text-center font-weight-bold">{this.props[_tab_].count.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
                  <div>{capitalize(_tab_)}</div>
                </div>
              )
            })}
            <FollowButton current={this.props.current} userId={this.props.id} following={this.props.followedByCurrentUser} />
            <img
              src={this.props.profilePic || egg}
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
          :  <Stream {...this.props[tab]} userId={this.props.id} type={tab} />
        }
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
