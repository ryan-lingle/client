import React from "react";
import { Loader, ErrorMessage } from ".";
import { Query } from "react-apollo";
import { EPISODE_SHOW } from "../actions";
import TwitterLogo from "../assets/Twitter_Logo_Blue.png";
import { toSats } from "../utils";

const RekCreated = ({ episodeId, rekId, userId }) => {
  if (!userId) {
    localStorage.setItem('rekId', rekId);
  };

  return(
    <Query query={EPISODE_SHOW} variables={{ episodeId, rekId: rekId.toString() }} >
      {({ data, loading, error }) => {
        if (loading) return <Loader />;
        if (error) return <ErrorMessage error={error} />;
        const { title, podcast } = data.episodeShow.episode;
        const { satoshis } = data.episodeShow.rek;
        const url = `${window.location.origin}/episode/${episodeId}?rekId=${rekId}`;
        return(
          <div id="rek-created">
            <div id="rc-sats">You just donated <strong>{toSats(satoshis)}</strong> to...</div>
            <div className="episode-info" id="rc-episode" style={{border: "none"}}>
              <img src={podcast.image} id="rek-form-podcast-art" alt="podcast art"/>
              <div id="rek-form-episode">{title}</div>
            </div>
            {userId ?
              <div id="rc-actions">
                <a className="btn btn-primary" href={url}>
                  View Rek
                </a>
                <a className="sign-in-btn" target="_blank" href={`https://twitter.com/intent/tweet?text=I just donated ${toSats(satoshis)} to ${podcast.title} on Rekr. Check out my episode rek:&url=${url}`} >
                  <img src={TwitterLogo} width={'30px'} alt="twitter-logo" />
                  Share on Twitter
                </a>
              </div>
              : <div className="text-center">
                  <div className="claim-rek-msg">
                    As of now, this is just a private donation. <br></br>To claim this Rek, you need to create a Rekr acount.
                  </div>
                  <a className="btn btn-primary" href={"/login?rek"}>
                    Sign Up
                  </a>
                </div>}
          </div>
        );
      }}
    </Query>
  )
}

export default RekCreated;
