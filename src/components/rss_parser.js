import React from "react";
import { Form, Button } from "react-bootstrap"
import Podcast from "./podcast";
import { PARSE_PODCAST, CREATE_PODCAST, CREATE_EPISODES } from '../actions';
import { Mutation, withApollo } from "react-apollo";
import { ErrorMessage, Loader } from ".";

class RssParser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      podcast: null,
    }
    this.rssUrl = React.createRef()
  }


  handlePodcast = ({ parsePodcast }) => {
    this.setState({ podcast: parsePodcast, loading: false })
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
      if (((i + 1) % 20) === 0) {
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
    this.props.client.mutate({
      mutation: CREATE_EPISODES,
      variables: {
        podcastId,
        episodes: payload
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
    const { podcast, loading } = this.state;
    return(
      <div>
        <div id="rss-validator">
          <Mutation mutation={PARSE_PODCAST} onCompleted={this.handlePodcast} >
            {(parsePodcast, { error }) => {
              return(
                <div id="rss-feed-form">
                  <div id="rss-feed-label">RSS Feed</div>
                  <Form inline onSubmit={(e) => {
                    e.preventDefault();
                    this.setState({ loading: true })
                    parsePodcast({ variables: {
                      rssUrl: this.rssUrl.current.value
                    }})
                  }}>
                    <Form.Group controlId="rss-feed">
                      <Form.Control type="rss-feed" ref={this.rssUrl} placeholder="https://your-podcast.com/rss-feed.rss" />
                      <button disabled={podcast} className="btn btn-primary">Fetch</button>
                    </Form.Group>
                  </Form>
                </div>
              )
            }}
          </Mutation>
          <Mutation mutation={CREATE_PODCAST}>
            {(createPodcast, { error }) => (
              <span >
                <ErrorMessage error={error} />
                <Button variant="primary" disabled={!podcast} onClick={() => {
                  this.handlePodcastCreate(createPodcast, podcast)
                }}>Submit</Button>
              </span>
            )}
          </Mutation>
        </div>
        {loading ? <Loader /> : null}
        {podcast ? <Podcast {...podcast} /> : null}
      </div>
    )
  }
}

export default withApollo(RssParser);
