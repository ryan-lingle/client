import React, { useState } from "react";
import { CREATE_PODCAST, SEARCH_PODCASTS } from '../actions';
import { Mutation, Query } from "react-apollo";
import { ErrorMessage, Loader } from ".";

const RssParser = () => {
  const [term, setTerm] = useState("");

  function handlePodcastCreate({ createPodcast }) {
    window.location = "podcast/" + createPodcast.slug;
  };

  return(
    <div id="add-podcast">
      <input
        className="form-control"
        placeholder="Search for a Podcast"
        value={term}
        onChange={({target}) => setTerm(target.value)}
      />
      <Query query={SEARCH_PODCASTS} variables={{term}}>
        {({ data, loading, error }) => {
          if (loading) return <Loader />;
          if (error) return <ErrorMessage error={error} />;

          return(
            <div id="podcast-search-results">
              {data.podcasts.map((podcast, i) =>
                <div className="podcast-search-result" key={i}>
                  <img src={podcast.image} alt="podcast art" className="rek-podcast-art"/>
                  <div className="psr-title">{podcast.title}</div>
                  <Mutation mutation={CREATE_PODCAST} onCompleted={handlePodcastCreate} >
                    {(createPodcast, {loading, error}) =>
                      (loading ?
                        <div style={{marginRight: "20px"}}><Loader /></div>
                        : <button
                          onClick={() => createPodcast({ variables: { rssUrl: podcast.rss }})}
                          className="btn btn-primary"
                        >
                          Add to Rekr
                        </button>)
                    }
                  </Mutation>
                </div>
              )}
            </div>
          );
        }}
      </Query>
    </div>
  )
};

export default RssParser;
