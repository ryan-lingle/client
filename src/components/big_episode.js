import React from 'react';
import { Tooltip } from '.';
import { Helmet } from "react-helmet";

const BigEpisode = ({ episode, rek, saveRek }) => {
  if (saveRek) localStorage.setItem('rekId', rek.id);
  const buildRek = () => {
    if (rek) {
      return(
        <div className="be-rek">
          <a href={"/u/" + rek.user.username}>
            <img src={rek.user.profilePic} alt={"avatar"} className="rounded-circle profile-pic" width={"40px"} />
          </a>
          <span className="font-weight-bold">{rek.user.username} </span>
          donated
          <span className="font-weight-bold"> {rek.satoshis} </span>
          Satoshis
        </div>
      )
    }
  }

  const tags = () => {
    return(
      <div className="be-tags"></div>
    )
  }
  const date = new Date(episode.released);
  return(
    <div className="big-episode-wrapper">
      <Helmet>
        <title>{episode.title}</title>
        <meta name="description" content="Some description." />
        <meta property="og:title" content="Some title." />
        <meta property="og:image" content={episode.podcast.image} />
      </Helmet>
      {buildRek()}
      {tags()}
      <div className="big-episode">
        <div id="big-episode-info">
          <Tooltip tooltip={episode.podcast.title}>
            <a href={"/podcast/" + episode.podcast.slug}>
              <img className="be-podcast-art" alt={"podcast art"} src={episode.podcast.image} />
            </a>
          </Tooltip>
          <div>
            <div className="be-title">{episode.title}</div>
            <div className="be-released">{date.toDateString()}</div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: episode.description }}></div>
      </div>
    </div>
  )
}

export default BigEpisode;
