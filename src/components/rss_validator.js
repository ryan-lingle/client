import React from "react";
import { Form, Button } from "react-bootstrap"
import Podcast from "./podcast";
import { CREATE_PODCAST } from '../actions';
import { Mutation } from "react-apollo";
import ErrorMessage from "./error_msg";

export default class RssValidator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rssurl: null,
      podcast: null,
    }
    this.rssUrl = React.createRef()
  }

  addRssUrl = (event) => {
    event.preventDefault()
    this.setState({ rssUrl: this.rssUrl.current.value })
  }

  addPodcast = (podcast) => {
    this.setState({ podcast })
  }

  podcastReducer = (podcast) => {
    const { title, image, description, email, website, rss, episodes } = podcast;
    return {
      title,
      rss,
      description,
      email,
      website,
      image,
      episodes: episodes.map(episode => this.episodeReducer(episode))
    }
  }

  episodeReducer = (episode) => {
    const { title, description, released } = episode;
    return { title, description, released }
  }

  // submitPodcast = (event) => {

  // }

  render() {
    const { rssUrl, podcast } = this.state;
    return(
      <div>
        <div id="rss-validator">
          <Form id="rss-feed-form" onSubmit={this.parse}>
            <Form.Group controlId="rss-feed">
              <Form.Label>RSS Feed</Form.Label>
              <Form.Control type="rss-feed" ref={this.rssUrl} placeholder="https://your-podcast.com/rss-feed.rss" />
            </Form.Group>
          </Form>
          <Button variant="primary" disabled={podcast} onClick={this.addRssUrl}>
            Validate
          </Button>
          <Mutation mutation={CREATE_PODCAST}>
            {(createPodcast, { error, data }) => (
              <span >
                <ErrorMessage error={error} />
                <Button variant="primary" disabled={!podcast} onClick={() => {
                  createPodcast({ variables: this.podcastReducer(podcast) })
                }}>Submit</Button>
              </span>
            )}
          </Mutation>
        </div>
        <div>
          {rssUrl
            ? <Podcast rssUrl={rssUrl} podcast={podcast} addPodcast={this.addPodcast} />
            : null}
        </div>
      </div>
    )
  }
}
