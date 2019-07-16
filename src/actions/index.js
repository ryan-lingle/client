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

const GET_USER = gql`
  query GetUser($username: String) {
    user(username: $username) {
      id
      username
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
  mutation CreatePodcast($title: String!, $rss: String!, $description: String, $email: String!, $website: String, $image: String!, $episodes: [EpisodeInput]) {
    createPodcast(title: $title, rss: $rss, description: $description, email: $email, website: $website, image: $image, episodes: $episodes) {
      id
      title
      description
      email
      image
      website
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
    }
  }
`

const LOGIN_USER = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      id
      token
    }
  }
`

const CREATE_REK = gql`
  mutation CreateRek($episodeId: Int!, $satoshis: Int!) {
    createRek(episodeId: $episodeId, satoshis: $satoshis) {
      invoice
      invoiceId
      satoshis
    }
  }
`

const SUBSRIBE_INVOICE = gql`
  subscription SubscribeInvoice($id: String!) {
    invoicePaid(id: $id) {
      invoice
      episode {
        title
        podcast {
          title
        }
      }
    }
  }
`

export {
  PARSE_RSS_FEED,
  GET_USER,
  GET_EPISODE,
  CREATE_PODCAST,
  SEARCH_EPISODES,
  SIGN_UP_USER,
  LOGIN_USER,
  CREATE_REK,
  SUBSRIBE_INVOICE
};
