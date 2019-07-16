import React from  'react';
import { Form, FormControl } from "react-bootstrap";
import { Query } from "react-apollo";
import { SEARCH_EPISODES } from "../actions"

export default class EpisodeSearch extends React.Component {

  state = {
    term: null
  }

  handleChange = ({ target }) => {
    this.setState({ term: target.value });
  }

  handleSelection = ({ target }) => {
    this.props.handleSelection(target.getAttribute('data-id'));
  }

  searchResults(term) {
    if (term) {
      return(
        <Query query={SEARCH_EPISODES} variables={{ term }}>
          {({ data, loading, error }) => {
            if (loading) return <p>LOADING</p>;
            if (error) return <p>ERROR</p>;
            return (
              <div id="episode-results">
                {data.searchEpisodes.map((result) => (
                  this.episodeResult(result)
                ))}
              </div>
            )
          }}
        </Query>
      )
    } else {
      return(
        <div id="before-search">
          Search Results
        </div>
      )
    }
  }

  episodeResult = (episode) => {
    return(
      <div id="episode-result" onClick={this.handleSelection} key={episode.id} data-id={episode.id} >
        <img src={episode.podcast.image} width="50px" alt="podcast art"/>
        <div>
          {episode.title}
        </div>
      </div>
    )
  }

  render() {
    const { term } = this.state;
    return(
      <div>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search for a Podcast Episode"
            id="episode-search"
            value={term || ""}
            onChange={this.handleChange}
          />
        </Form>
        {this.searchResults(term)}
      </div>
    )
  }
}
