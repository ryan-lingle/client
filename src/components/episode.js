import React, { Fragment } from "react";
import RekModal from "./rek_modal";
import BookmarkButton from "./bookmark_button";
import Tooltip from "./tooltip";

const Episode = ({ episode, podcast, rekId, rekBtn=true, children }) => {
  if (!podcast) podcast = episode.podcast;

  function episodeDate() {
    const date = new Date(episode.released);
    return <div className="episode-date">{date.toDateString()}</div>
  };

  return(
    <div className="item" style={{display: "block"}}>
      {children || episodeDate()}
      <div className="episode">
        <Tooltip tooltip={podcast.title}>
          <a href={"/podcast/" + podcast.slug}>
            <img className="podcast-art" alt="podcast art" src={podcast.image} width={"80px"} />
          </a>
        </Tooltip>
        <a className="episode-details" href={`/episode/${episode.id}${rekId ? `?rekId=${rekId}` : ""}`}>
          <div>
            {podcast.title}
          </div>
          <div className="episode-spacer"></div>
          <div>
            {episode.title}
          </div>
        </a>
        {rekBtn ?
          <RekModal episodeId={episode.id}>
            <div href="#" id="rek-btn" className="rek-btn btn btn-secondary episode-rek-btn">Rek</div>
          </RekModal>
          : null}
        <BookmarkButton bookmarked={episode.bookmarked} episodeId={episode.id} />
      </div>
    </div>
  )
}

export default Episode;
