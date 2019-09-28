import React from 'react';
import BookmarkButton from './bookmark_button';
import { observer } from '../utils';
import { CREATE_REK_VIEW } from "../actions";
import { withApollo } from "react-apollo";
import Tooltip from "./tooltip";

class Rek extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      const rekCallback = ({ target }) => {
        const rekId = parseInt(target.id.split("-")[1]);
        this.props.client.mutate({
          mutation: CREATE_REK_VIEW,
          variables: {
            rekId
          }
        });
      }

      const rekObserver = observer(rekCallback);
      const rek = document.getElementById(`rek-${this.props.id}`);

      rekObserver.observe(rek);
    }
  }

  handleClick = ({ target }) => {
    if (target.id !== "bookmark-btn") {
      window.location.href = `/episode/${this.props.episode.id}?rekId=${this.props.id}`;
    }
  }

  render() {
    const { user, episode, satoshis, id, hashtags } = this.props;
    const { podcast } = episode;
    return(
      <div className="rek item" id={`rek-${id}`}>
        <div className="rek-wrap">
          <div className="rek-flex" id="rek-flex-1">
            <a href={"/u/" + user.username}>
              <img src={user.profilePic} alt={"avatar"} className="rounded-circle rek-profile-pic" />
            </a>
            <div className="rek-middle">
              <a className="rek-username" href={"/u/" + user.username}>{user.username}</a>
              <br></br>
              <a className="rek-episode-details" href={`/episode/${this.props.episode.id}?rekId=${this.props.id}`}>{episode.title}</a>
            </div>
            <Tooltip tooltip={podcast.title}>
              <a href={"/podcast/" + podcast.slug} className="rek-podcast">
                <img className="rek-podcast-art" alt={"podcast art"} src={podcast.image} width={"70px"} />
              </a>
            </Tooltip>
          </div>
          <div id="rek-flex-2">
            <div id="rek-flex-2-1">
              <div className="rek-satoshis">{satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})} sats</div>
              <div className="rek-bookmark">
                <BookmarkButton bookmarked={episode.bookmarked} episodeId={episode.id} rekId={id} />
              </div>
            </div>
            <div id="rek-hashtags">
              {hashtags.map(hashtag => <a key={hashtag.id} href={`/hashtag/${hashtag.name}`} className="rek-hashtag">#{hashtag.name}</a>)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withApollo(Rek);
