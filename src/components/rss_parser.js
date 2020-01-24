import React, { useState } from "react";
import { CREATE_PODCAST } from '../actions';
import { Mutation, withApollo } from "react-apollo";
import { ErrorMessage, Loader } from ".";

const RssParser = () => {
  const [rss, setRss] = useState("");

  function handlePodcast({ createPodcast }) {
    console.log(createPodcast);
  };

  return(
    <Mutation mutation={CREATE_PODCAST} onCompleted={handlePodcast}>
      {(createPodcast, {error, loading}) => (
        <form id="rss-form" onSubmit={(e) => {
          e.preventDefault();
          createPodcast({ variables: {
            rssUrl: rss
          }});
        }}>
          <div id="rss-input">
            <div className="form-label">RSS Feed</div>
            <input
              className="form-control"
              placeholder="https://your-podcast.com/rss-feed.rss"
              value={rss}
              onChange={({ target }) => setRss(target.value)}
            />
            <button className="btn btn-primary">Fetch</button>
          </div>
        </form>
      )}
    </Mutation>
  )
};

export default RssParser;
