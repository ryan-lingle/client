import React from 'react';
import { Search, ErrorMessage, Loader, HashtagCard } from "../components";

export default class HashtagSearch extends React.Component {
  state = {
    term: ''
  }
  render() {
    return(
      <div id="og-hashtag-search">
        <input
          placeholder="Search for some topics to follow!"
          className="form-control"
          value={this.state.term}
          onChange={({ target }) => this.setState({ term: target.value })}
        />
        <Search term={this.state.term} type={'hashtag'}>
          {({ results, error, loading }) => {
            if (loading) return <Loader />;
            if (error) return <ErrorMessage error={error} />;
            return(
              <div id="hashtag-results">
                {results.map(hashtag =>
                  <HashtagCard {...hashtag} key={hashtag.id} width={"100%"} />
                )}
              </div>
            )
          }}
        </Search>
      </div>
    )
  }
}
