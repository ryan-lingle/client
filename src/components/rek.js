import React from 'react';
import BookmarkButton from './bookmark_button';
import { observer } from '../utils';
import Tooltip from "./tooltip";

export default class Rek extends React.Component {
  componentDidMount() {
    const rek = document.getElementById(`rek-${this.props.id}`);
    observer.observe(rek);
  }

  render() {
    const { user, episode, satoshis, id } = this.props;
    const { podcast } = episode;
    return(
      <div className="rek item" id={`rek-${id}`} >
        <div>
          <div className="rek-flex" id="rek-flex-1">
            <a href={"/u/" + user.username}>
              <img src={user.profilePic} alt={"avatar"} className="rounded-circle profile-pic" width={"60px"} />
            </a>
            <div className="rek-middle">
              <a href={"/u/" + user.username}>
                <div className="rek-username">{user.username}</div>
              </a>
              <div>{episode.title}</div>
            </div>
          </div>
          <div className="rek-flex" id="rek-flex-2">
            <div className="rek-satoshis">{satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})} sats</div>
            <BookmarkButton bookmarked={episode.bookmarked} episodeId={episode.id} />
          </div>
        </div>
        <Tooltip tooltip={podcast.title}>
          <a href={"/podcast/" + podcast.slug}>
            <img className="rek-podcast-art" alt={"podcast art"} src={podcast.image} width={"70px"} />
          </a>
        </Tooltip>
      </div>
    )
  }
}
