import React, { useState } from "react";
import { CREATE_PODCAST, SEARCH_PODCASTS } from '../actions';
import { Mutation, Query } from "react-apollo";
import { ErrorMessage, Loader } from ".";

const RssParser = () => {
  const [term, setTerm] = useState("");

  return(
    <div>
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
            <div>
              {data.podcasts.map((podcast, i) =>
                <div key={i}>
                  <div>{podcast.title}</div>
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
