import React from "react";
import Loader from './loader';
import { Query } from "react-apollo";
import { PARSE_RSS_FEED } from '../actions'

const Podcast = (props) => {
  const buildEpisodes = (episodes) => {
    return episodes.map((e, i) => {
      return(
        <tr key={i} className="episode-row">
          <td>{e.title}</td>
          <td>{e.description}</td>
          <td>{e.released}</td>
        </tr>
      )
    })
  }


  const { rssUrl } = props;
  return(
    <Query query={PARSE_RSS_FEED} variables={{ rssUrl }}>
      {({ data, loading, error }) => {
        if (error) return <p>{JSON.stringify(error)}</p>;
        if (loading) return <Loader />;

        // pass podcast vars to parent
        if (!props.podcast) props.addPodcast(data.parsePodcast);
        const { email, description, image, title, website, episodes } = props.podcast || data.parsePodcast;

        return (
          <div>
            <div id="podcast-details">
              <div>
                <img src={image} alt="podcast art" width="325px" className="podcast-artwork-lg"/>
              </div>
              <div id="podcast-details-1">
                <div className="podcast-detail">
                  <h4>Title</h4>
                  <h4 className="thin" >{title || "No Title Found"}</h4>
                </div>
                <div className="podcast-detail">
                  <h4>Website</h4>
                  <h4 className="thin">{website || "No Website Found"}</h4>
                </div>
                <div className="podcast-detail">
                  <h4>Email</h4>
                  <h4 className="thin">{email || "No Email Found"}</h4>
                </div>
                <div className="podcast-detail">
                  <h4>Description</h4>
                  <h4 className="thin">{description || "No Description Found"}</h4>
                </div>
              </div>
            </div>
            <table id="episode-details">
              <thead>
                <tr>
                  <th><h4>Episode</h4></th>
                  <th><h4>Description</h4></th>
                  <th><h4>Released</h4></th>
                </tr>
              </thead>
              <tbody>
                {buildEpisodes(episodes)}
              </tbody>
            </table>
          </div>
        )
      }}
    </Query>
  )
}

export default Podcast;
