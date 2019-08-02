import React from "react";
import egg from "../egg.jpg";
import FollowButton from "./follow_button";

const User = ({ id, current, followedByCurrentUser, username, profilePic }) => {
  return(
    <div className="user item">
      <img src={profilePic || egg} className="rounded-circle" alt="avatar" width="60px" />
      <a href={"/u/" + username}>
        <div className="user-username">{username}</div>
      </a>
      <FollowButton current={current} userId={id} following={followedByCurrentUser} />
    </div>
  )
}

export default User;
