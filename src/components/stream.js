import React from "react";
import gql from "graphql-tag";
import Rek from "./rek";
import User from "./user";
import Episode from "./episode"
import { Loader } from ".";
import { withApollo } from "react-apollo";


const FOLLOWER_STREAM = gql`
  query FollowerStream($userId: Int, $n: Int!) {
    users(userId: $userId, n: $n, followers: true) {
      more
      stream {
        current
        id
        username
        profilePic
        followedByCurrentUser
      }
    }
  }
`

const FOLLOWING_STREAM = gql`
  query FollowingStream($userId: Int, $n: Int!) {
    users(userId: $userId, n: $n, following: true) {
      more
      stream {
        current
        id
        username
        profilePic
        followedByCurrentUser
      }
    }
  }
`

const FEED_STREAM = gql`
  query FeedStream($n: Int!) {
    reks(n: $n, feed: true) {
      more
      stream {
        id
        satoshis
        user {
          id
          profilePic
          username
        }
        episode {
          title
          id
          bookmarked
          podcast {
            title
            image
            slug
          }
        }
      }
    }
  }
`

const REK_STREAM = gql`
  query RekStream($n: Int!, $userId: Int!) {
    reks(n: $n, userId: $userId) {
      more
      stream {
        id
        satoshis
        user {
          id
          profilePic
          username
        }
        episode {
          title
          id
          bookmarked
          podcast {
            title
            image
            slug
          }
        }
      }
    }
  }
`

const BOOKMARK_STREAM = gql`
  query BookmarkStream($userId: Int, $n: Int!) {
    bookmarks(userId: $userId, n: $n) {
      more
      stream {
        id
        episode {
          id
          title
          bookmarked
          podcast {
            slug
            title
            image
          }
        }
      }
    }
  }
`

const mapping = {
  feed: {
    component: Rek,
    query: FEED_STREAM
  },
  reks: {
    component: Rek,
    query: REK_STREAM
  },
  following: {
    component: User,
    query: FOLLOWING_STREAM
  },
  followers: {
    component: User,
    query: FOLLOWER_STREAM
  },
  bookmarks: {
    component: Episode,
    query: BOOKMARK_STREAM
  }
}

class Stream extends React.Component {
  state = {
    stream: this.props.stream,
    more: this.props.more,
    n: 1,
    loading: false
  };

  fetchMore = async () => {
    const { query } = mapping[this.props.type];
    let { n } = this.state;
    const res = await this.props.client.query({
      query,
      variables: { n, userId: parseInt(this.props.userId) }
    });
    const { more, stream } = res.data.reks || res.data.bookmarks || res.data.users;
    this.setState(prevState => {
      const newStream = prevState.stream.concat(stream);
      n += 1;
      return { stream: newStream, more, n, loading: false }
    })
  }

  componentWillReceiveProps({ stream, more }) {
    this.setState({ stream, more, n: 1 })
  }

  addListener = () => {
    document.addEventListener('scroll', this.endOfStream)
  }

  endOfStream = () => {
    const { loading, more } = this.state;
    const atBottom = document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight;
    if (atBottom && !loading && more) {
      this.fetchMore()
      this.setState({ loading: true });
      document.removeEventListener('scroll', this.endOfStream);
    }
  }

  render() {
    setTimeout(this.addListener, 100)
    const Component = mapping[this.props.type].component;
    return(
      <div>
        <div className="stream">
          {
            this.state.stream.map(item => <Component {...item} key={item.id}/>)
          }
        </div>
        {this.state.loading ? <Loader /> : null}
      </div>
    )
  }
};

export default withApollo(Stream);
