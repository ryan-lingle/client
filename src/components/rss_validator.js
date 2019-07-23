import React from "react";
import { Form, Button } from "react-bootstrap"
import Podcast from "./podcast";
import { CREATE_PODCAST, CREATE_EPISODES } from '../actions';
import { Mutation, withApollo } from "react-apollo";
import ErrorMessage from "./error_msg";

class RssValidator extends React.Component {
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

  episodeReducer = (episode) => {
    const { title, description, released } = episode;
    return { title, description, released }
  }

  handleEpisodeCreate = async (episodes, podcastId) => {
    const payload = [];
    episodes.forEach((episode, i) => {
      const { title, description, released } = episode;
      payload.push({ title, description, released });
      if (((i + 1) % 25) === 0) {
        this.props.client.mutate({
          mutation: CREATE_EPISODES,
          variables: {
            podcastId,
            episodes: payload
          }
        });
        payload.length = 0;
      }
    });
  }

  handlePodcastCreate = async (createPodcast, podcast) => {
    const { title, image, description, email, website, rss, episodes } = podcast;
    const { data } = await createPodcast({ variables: {
      title, image, description,
      email, website, rss
    }})
    this.handleEpisodeCreate(episodes, data.createPodcast.id);
  }

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
                  this.handlePodcastCreate(createPodcast, podcast)
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

export default withApollo(RssValidator);
