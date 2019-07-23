import React from "react";
import { Stream, Loader, ErrorMessage } from "../components";
import { Query } from "react-apollo";
import { HOME } from '../actions';
const Home = ({ match }) => {
  return(
    <div id="home" >
      <Query query={HOME}>
        {({ data, loading, error }) => {
          if (error) return <ErrorMessage error={error} />;
          if (loading) return <Loader />;
          return <Stream {...data.currentUser.feed} type={"feed"} />
        }}
      </Query>
    </div>
  )
}

export default Home;
