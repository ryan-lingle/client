import React from "react";
import FollowButton from "./follow_button";

const User = ({ id, current, followedByCurrentUser, username, profilePic }) => {
  return(
    <div className="user item">
      <img src={profilePic} className="rounded-circle" alt="avatar" width="60px" />
      <a href={"/u/" + username}>
        <div className="user-username">{username}</div>
      </a>
      <FollowButton
        current={current}
        followeeId={id}
        following={followedByCurrentUser}
        type={'user'}
      />
    </div>
  )
}

export default User;
