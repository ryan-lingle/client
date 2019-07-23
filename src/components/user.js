import React from "react";
import egg from "../egg.jpg";
import FollowButton from "./follow_button";

const User = ({ id, followedByCurrentUser, username }) => {
  return(
    <div className="user item">
      <img src={egg} className="rounded-circle" alt="avatar" width="60px" />
      <a href={"/u/" + username}>
        <div className="rek-username">{username}</div>
      </a>
      <FollowButton userId={id} following={followedByCurrentUser} />
    </div>
  )
}

export default User;
