import React from 'react';
import Egg from '../egg.jpg';
import Bookmark from './bookmark';

const Rek = (props) => {
  return(
    <div className="rek">
      <div>
        <div className="rek-flex" id="rek-flex-1">
          <a href={"/u/" + props.user.username}>
            <img src={Egg} alt={"avatar"} className="rounded-circle rek-podcast-art" width={"60px"} />
          </a>
          <div className="rek-middle">
            <a href={"/u/" + props.user.username}>
              <div className="rek-username">{props.user.username}</div>
            </a>
            <div>{props.episode.title}</div>
          </div>
        </div>
        <div className="rek-flex" id="rek-flex-2">
          <div className="rek-satoshis">{props.satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})} sats</div>
          <Bookmark />
        </div>
      </div>
      <img className="rek-podcast-art" alt={"podcast art"} src={props.episode.podcast.image} width={"70px"} />
    </div>
  )
}

export default Rek;
