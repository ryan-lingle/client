import React from 'react';
import BookmarkButton from './bookmark_button';
import { observer, toSats } from '../utils';
import { CREATE_REK_VIEW } from "../actions";
import { withApollo } from "react-apollo";
import { Tooltip, Episode } from ".";

const RekHeader = ({ user, satoshis, hashtags }) => {
  return(
    <div className="rek-header">
      <span className="rek-description">
        <a className="rek-username" href={"/u/" + user.username}>{user.username}</a> donated
        <span className="rek-sats"> {toSats(satoshis)}</span>
        {hashtags.length > 0 ? " in" : ""}
      </span>
      <span className="rek-hashtags">
        {hashtags.map(hashtag => <a key={hashtag.id} href={`/hashtag/${hashtag.name}`} className="rek-hashtag">#{hashtag.name}</a>)}
      </span>
    </div>
  );
};

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

  render() {
    const { user, episode, id, hashtags, satoshis, variables } = this.props;
    const { podcast } = episode;

    return(
      <div id={`rek-${id}`}>
        <Episode episode={episode} podcast={podcast} rekId={id} rekBtn={false} >
          <RekHeader user={user} satoshis={satoshis} hashtags={hashtags} />
        </Episode>
      </div>
    )
  }
}

export default withApollo(Rek);
