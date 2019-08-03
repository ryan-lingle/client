import React from "react";
import { Query } from "react-apollo";
import { Loader, ErrorMessage } from ".";
import { Form } from "react-bootstrap";
import { SEARCH } from "../actions";

export default class Search extends React.Component {
  state = {
    type: "user",
    term: "",
  }

  handleTermChange = ({ target }) => {
    this.setState({ term: target.value })
  }

  hashtagResult = ({ name }, i) => {
    return(
      <a key={i} className="search-result text-center" href={`/hashtag/${name}`} >
        {name}
      </a>
    )
  }

  podcastResult = (podcast, i) => {
    return(
      <a key={i} className="podcast-result search-result" href={`/podcast/${podcast.slug}`} >
        <img src={podcast.image} width="60px" alt="podcast art"/>
        <div>{podcast.title}</div>
      </a>
    )
  }

  userResult = (user, i) => {
    return(
      <a key={i} className="search-result" href={`/u/${user.username}`} >
        <img src={user.profilePic} alt={"avatar"} className="rounded-circle" width={"60px"} />
        <div>{user.username}</div>
      </a>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search?q=${this.state.term}`
  }


  render() {
    const { term, type } = this.state;
    return(
      <Form inline id="search-form" onSubmit={this.handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Search Rekr"
          className="mr-sm-2"
          value={term}
          onChange={this.handleTermChange}
        />
        {term ?
          <div id="search-results">
            <Query query={SEARCH} variables={ { term, type }} >
              {({ data, loading, error }) => {
                if (loading) return <div className="loader-padding"><Loader /></div>;
                if (error) return <ErrorMessage error={error} />;
                return (
                  <div>
                    <div id="search-tabs">
                      {['podcast', 'user', 'hashtag'].map((tab, i) => {
                          const current = type === tab;
                          return <span key={i} onClick={() => this.setState({ type: tab })} className={`search-tab ${current ? 'current-search-tab' : null}`} id={`${tab}-search-tab`}>{tab}s</span>
                        }
                      )}
                    </div>
                    <div>
                      {data.search[type].stream.map((result, i) => (
                        this[type + 'Result'](result, i)
                      ))}
                    </div>
                  </div>
                )
              }}
            </Query>
          </div>
          : null}
      </Form>
    )
  }
}
