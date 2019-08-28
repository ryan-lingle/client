import React from "react";
import HashtagCard from "./hashtag_card";

const HashtagBox = ({ hashtags }) => {
  return(
    <div id="hashtag-box">
      <h3 id="hashtag-box-heading">Followed Topics</h3>
      <div className="hashtags">
        {hashtags.length > 0 ?
          hashtags.map(hashtag =>
            <HashtagCard {...hashtag} key={hashtag.id} width={"100%"} X={true}/>)
            : <div id="no-topic-msg">
                <div>You aren't following any Topics yet.</div>
                <br></br>
                <div>Recomended Topics:</div>
                <a href="/hashtag/bitcoin">bitcoin</a>
              </div>}
      </div>
    </div>
  )
}

export default HashtagBox;
