import React from "react";
import { ErrorMessage } from ".";
import { Form } from "react-bootstrap";
import { Search } from ".";

export default class NavSearch extends React.Component {
  state = {
    type: "user",
    term: "",
  }

  handleTermChange = ({ target }) => {
    this.setState({ term: target.value })
  }

  hashtagResult = ({ id, name }) => {
    return(
      <a key={id} className="search-result text-center" href={`/hashtag/${name}`} >
        {name}
      </a>
    )
  }

  podcastResult = ({ id, image, title, slug }) => {
    return(
      <a key={id} className="podcast-result search-result" href={`/podcast/${slug}`} >
        <img src={image} width="60px" alt="podcast art"/>
        <div>{title}</div>
      </a>
    )
  }

  userResult = ({ id, profilePic, username }) => {
    return(
      <a key={id} className="search-result" href={`/u/${username}`} >
        <img src={profilePic} alt={"avatar"} className="rounded-circle" width={"60px"} />
        <div>{username}</div>
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
        <Search term={term} type={type} >
          {({ results, loading, error }) => {
            if (loading) return <div className="loader-padding"></div>;
            if (error) return <ErrorMessage error={error} />;
            return (
              <div id="search-results">
                <div id="search-tabs">
                  {['podcast', 'user', 'hashtag'].map((tab, i) => {
                      const current = type === tab;
                      return <span key={i} onClick={() => this.setState({ type: tab })} className={`search-tab ${current ? 'current-search-tab' : null}`} id={`${tab}-search-tab`}>{tab}s</span>
                    }
                  )}
                </div>
                <div>
                  {results.map((result) => (
                    this[type + 'Result'](result)
                  ))}
                </div>
              </div>
            )
          }}
        </Search>
      </Form>
    )
  }
}
