import React from "react";
import RekModal from "./rek_modal";
import BookmarkButton from "./bookmark_button";

const Episode = ({id, episode}) => {
  const { podcast } = episode;
  return(
    <div className="episode item" >
      <img className="podcast-art" alt="podcast-art" width={"70px"} src={podcast.image} />
      <div className="episode-details">
        <div>
          {podcast.title}
        </div>
        <div>
          {episode.title}
        </div>
      </div>
      <RekModal episodeId={episode.id} >
        <div href="#" className="rek-btn btn btn-secondary episode-rek-btn">Rek</div>
      </RekModal>
      <BookmarkButton bookmarked={episode.bookmarked} episodeId={episode.id} />
    </div>
  )
}

export default Episode;
