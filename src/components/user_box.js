import React from "react";

const UserBox = (user) => {
  const { username, profilePic } = user;
  return(
    <div id="user-box" >
      <div id="user-box-flex">
        <a href={`/u/${username}`} >
          <img src={profilePic} alt="avatar" className="rounded-circle profile-pic" id="user-box-profile-pic" />
        </a>
        <a id="user-box-username" href={`/u/${username}`} >
          {username}
        </a>
      </div>
      <a id="user-box-satoshis" href={`/u/${username}?tab=satoshis`} >
        {user.satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})} Satoshis
      </a>
      <div id="user-box-counts">
        <a className="user-box-count" href={`/u/${username}?tab=reks`}>
          <div className="count">{user.reks.count}</div>
          <div className="count-label">Reks</div>
        </a>
        <a className="user-box-count" href={`/u/${username}?tab=bookmarks`}>
          <div className="count">{user.bookmarks.count}</div>
          <div className="count-label">Bookmarks</div>
        </a>
        <a className="user-box-count" href={`/u/${username}?tab=following`}>
          <div className="count">{user.following.count}</div>
          <div className="count-label">Following</div>
        </a>
        <a className="user-box-count" href={`/u/${username}?tab=followers`}>
          <div className="count">{user.followers.count}</div>
          <div className="count-label">Followers</div>
        </a>
      </div>
    </div>
  )
}

export default UserBox;
