import React from "react";
import FollowButton from "./follow_button";
import { TOGGLE_FOLLOW } from "../actions";
import { Mutation } from "react-apollo";

const HashtagCard = ({ id, name, followedByCurrentUser, width, X }) => {
  const remove = () => {
    document.getElementById(`hashtag-${id}`).style.display = "none";
  }

  const style = width ? { width } : {};
  return(
    <div id={`hashtag-${id}`} className="item hashtag-card" style={style} >
      <a href={`/hashtag/${name}`}><div>{name}</div></a>
      {X ?
        <Mutation mutation={TOGGLE_FOLLOW} onCompleted={remove} >
          {(toggleFollow, { error }) => (
            <i className="fa fa-times-circle x" onClick={() => toggleFollow({ variables: { hashtagId: id, type: "hashtag" } })}/>
            )}
        </Mutation>
        : <FollowButton
          hashtagId={id}
          following={followedByCurrentUser}
          type={'hashtag'}
        />}
    </div>
  )
}

export default HashtagCard;
