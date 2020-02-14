import React, { useState } from "react";
import { ErrorMessage } from ".";
import { Search, Tabs } from ".";

const NavSearch = () => {

  const [type, setType] = useState("user");
  const [term, setTerm] = useState("");


  function handleTermChange({ target }) {
    setTerm(target.value);
  }

  const reducers = {
    podcast: function({ id, image, title, slug }) {
      return(
        <a key={id} className="podcast-result search-result" href={`/podcast/${slug}`} >
          <img src={image} width="60px" alt="podcast art"/>
          <div>{title}</div>
        </a>
      )
    },
    user: function({ id, username, profilePic }) {
      return(
        <a key={id} className="search-result" href={`/u/${username}`} >
          <img src={profilePic} alt={"avatar"} className="rounded-circle" width={"60px"} />
          <div>{username}</div>
        </a>
      )
    },
    hashtag: function({ id, name }) {
      return(
        <a key={id} className="search-result text-center" href={`/hashtag/${name}`} >
          {name}
        </a>
      )
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.location.href = `/search?q=${term}`
  }


  return(
    <form id="search-form" onSubmit={handleSubmit}>
      <input
        className="form-control"
        placeholder="Search Rekr"
        value={term}
        onChange={handleTermChange}
      />
      <Search term={term} type={type} >
        {({ results, loading, error }) => {
          if (loading) return <div className="loader-padding"></div>;
          if (error) return <ErrorMessage error={error} />;
          return (
            <div id="search-results">
              <Tabs
                tabs={["podcast", "user", "hashtag"]}
                pluralize={true}
                _default={"user"}
                onChange={(tab) => setType(tab)}
                customClass="search-tab"
                selectedClass="current-search-tab"
              />
              <div>
                {results.map((result) => (
                  reducers[type](result)
                ))}
              </div>
            </div>
          )
        }}
      </Search>
    </form>
  )
}

export default NavSearch;
