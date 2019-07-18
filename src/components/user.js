import React from "react";
import egg from "../egg.jpg";

const User = (props) => {
  return(
    <div className="user">
      <img src={egg} className="rounded-circle" alt="avatar" width="60px" />
      <div>{props.username}</div>
      <div className="btn btn-secondary follow-btn">Follow</div>
    </div>
  )
}

export default User;
