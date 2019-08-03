import React from "react";
import HashtagCard from "./hashtag_card";

const HashtagBox = ({ hashtags }) => {
  return(
    <div id="hashtag-box">
      <h3 id="hashtag-box-heading">Sub-Reks</h3>
      <div className="hashtags">
        {hashtags.length > 0 ?
          hashtags.map(hashtag =>
            <HashtagCard {...hashtag} key={hashtag.id} width={"100%"} X={true}/>)
            : <div className="text-center">No Sub-Reks Being Followed Yet</div>}
      </div>
    </div>
  )
}

export default HashtagBox;
