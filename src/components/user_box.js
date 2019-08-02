import React from "react";
import { Query } from "react-apollo";
import { CURRENT_USER } from "../actions";

const UserBox = () => {
  return(
    <Query query={CURRENT_USER} >
      {({ data, error, loading}) => {
        if (error || loading) return <div></div>
        const { currentUser } = data;
        const { username, profilePic } = currentUser;
        return(
          <div id="user-box" >
            <div id="user-box-flex">
              <a href={`/u/${username}`} >
                <img src={profilePic} alt="avatar" className="rounded-circle profile-pic" id="user-box-profile-pic" width={"60px"} />
              </a>
              <a id="user-box-username" href={`/u/${username}`} >
                {username}
              </a>
            </div>
            <a id="user-box-satoshis" href={`/u/${username}?tab=satoshis`} >
              {currentUser.satoshis} Satoshis
            </a>
            <div id="user-box-counts">
              <a className="user-box-count" href={`/u/${username}?tab=reks`}>
                <div className="count-label">Reks</div>
                <div className="count">{currentUser.reks.count}</div>
              </a>
              <a className="user-box-count" href={`/u/${username}?tab=bookmarks`}>
                <div className="count-label">Bookmarks</div>
                <div className="count">{currentUser.bookmarks.count}</div>
              </a>
              <a className="user-box-count" href={`/u/${username}?tab=following`}>
                <div className="count-label">Following</div>
                <div className="count">{currentUser.following.count}</div>
              </a>
              <a className="user-box-count" href={`/u/${username}?tab=followers`}>
                <div className="count-label">Followers</div>
                <div className="count">{currentUser.followers.count}</div>
              </a>
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default UserBox;
