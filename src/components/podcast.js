import React from "react";
import Episode from "./episode";

const Podcast = (podcast) => {
  const { image, title, website, description, email, episodes } = podcast;
  return (
    <div>
      <div id="podcast">
        <div>
          <img src={image} alt="podcast art" width="325px" className="podcast-artwork-lg"/>
        </div>
        <div id="podcast-details-1">
          <div className="podcast-detail">
            <h4>Title</h4>
            <h4 className="thin" >{title || "No Title Found"}</h4>
          </div>
          <div className="podcast-detail">
            <h4>Website</h4>
            <h4 className="thin">{website || "No Website Found"}</h4>
          </div>
          <div className="podcast-detail">
            <h4>Email</h4>
            <h4 className="thin">{email || "No Email Found"}</h4>
          </div>
          <div className="podcast-detail">
            <h4>Description</h4>
            <h4 className="thin" dangerouslySetInnerHTML={{ __html: description }}></h4>
          </div>
        </div>
      </div>
      {episodes.map((episode, i) => {
        return <Episode episode={episode} podcast={podcast} key={i} />
      })}
    </div>
  )
}

export default Podcast;
