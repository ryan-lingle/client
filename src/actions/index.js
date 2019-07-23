import gql from "graphql-tag";

const PARSE_RSS_FEED = gql`
  query ParseRssFeed($rssUrl: String!) {
    parsePodcast(rssUrl: $rssUrl) {
      id
      title
      description
      rss
      email
      image
      website
      episodes {
        title
        description
        released
      }
    }
  }
`

const USERNAME = gql`
  query USERNAME {
    currentUser {
      username
    }
  }
`

const CURRENT_SATS = gql`
  query USERNAME {
    currentUser {
      satoshis
    }
  }
`

const HOME = gql`
  query home {
    currentUser {
      feed {
        more
        stream {
          id
          satoshis
          user {
            id
            username
          }
          episode {
            title
            id
            bookmarked
            podcast {
              title
              image
            }
          }
        }
      }
    }
  }
`

const GET_USER = gql`
  query GetUser($username: String) {
    user(username: $username) {
      id
      satoshis
      username
      current
      followedByCurrentUser
      bookmarks {
        count
        more
        stream {
          id
          episode {
            id
            bookmarked
            title
            podcast {
              image
            }
          }
        }
      }
      reks {
        count
        more
        stream {
          id
          satoshis
          episode {
            id
            bookmarked
            title
            podcast {
              image
            }
          }
          user {
            id
            username
          }
        }
      }
      followers {
        count
        more
        stream {
          id
          username
          followedByCurrentUser
        }
      }
      following {
        count
        more
        stream {
          id
          username
          followedByCurrentUser
        }
      }
    }
  }
`

const GET_EPISODE = gql`
  query GetEpisode($id: Int!) {
    episode(id: $id) {
      title
      podcast {
        image
      }
    }
  }
`
const CREATE_PODCAST = gql`
  mutation CreatePodcast($title: String!, $rss: String!, $description: String, $email: String!, $website: String, $image: String!) {
    createPodcast(title: $title, rss: $rss, description: $description, email: $email, website: $website, image: $image) {
      id
      title
      description
      email
      image
      website
    }
  }
`

const CREATE_EPISODES = gql`
  mutation CreateEpisodes($episodes: [EpisodeInput], $podcastId: String!) {
    createEpisodes(episodes: $episodes, podcastId: $podcastId) {
      id
    }
  }
`

const SEARCH_EPISODES = gql`
  query SearchEpisodes($term: String!) {
    searchEpisodes(term: $term) {
      id
      title
      podcast {
        image
      }
    }
  }
`

const SIGN_UP_USER = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      id
      token
      username
    }
  }
`

const LOGIN_USER = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      id
      token
      username
    }
  }
`

const CREATE_REK = gql`
  mutation CreateRek($episodeId: String!, $walletSatoshis: Int, $invoiceSatoshis: Int) {
    createRek(episodeId: $episodeId, walletSatoshis: $walletSatoshis, invoiceSatoshis: $invoiceSatoshis) {
      invoice
      satoshis
    }
  }
`

const SUBSRIBE_INVOICE = gql`
  subscription SubscribeInvoice($invoice: String!) {
    invoicePaid(invoice: $invoice) {
      userId
      invoice
    }
  }
`

const TOGGLE_FOLLOW = gql`
  mutation ToggleFollow($userId: Int!) {
    toggleFollow(userId: $userId)
  }
`

const CREATE_BOOKMARK = gql`
  mutation CreateBookmark($episodeId: Int!) {
    createBookmark(episodeId: $episodeId) {
      bookmarkExists
    }
  }
`

const DESTROY_BOOKMARK = gql`
  mutation DestroyBookmark($episodeId: Int!) {
    destroyBookmark(episodeId: $episodeId) {
      bookmarkExists
    }
  }
`

const BOOKMARKS = gql`
  query Bookmarks {
    currentUser {
      bookmarks {
        more
        stream {
          id
          episode {
            id
            title
            bookmarked
            podcast {
              title
              image
            }
          }
        }
      }
    }
  }
`

const WITHDRAW = gql`
  mutation WITHDRAW($satoshis: Int!) {
    withdrawInvoice(satoshis: $satoshis) {
      satoshis
      invoice
    }
  }
`

export {
  PARSE_RSS_FEED,
  HOME,
  USERNAME,
  CURRENT_SATS,
  GET_USER,
  GET_EPISODE,
  CREATE_PODCAST,
  CREATE_EPISODES,
  SEARCH_EPISODES,
  SIGN_UP_USER,
  LOGIN_USER,
  CREATE_REK,
  SUBSRIBE_INVOICE,
  TOGGLE_FOLLOW,
  CREATE_BOOKMARK,
  DESTROY_BOOKMARK,
  BOOKMARKS,
  WITHDRAW
};
