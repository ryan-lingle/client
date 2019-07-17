import React from "react";
import { Feed, Loader, ErrorMessage } from "../components";
import { Query } from "react-apollo";
import { HOME } from '../actions';
const Home = ({ match }) => {
  return(
    <div id="home" >
      <Query query={HOME}>
        {({ data, loading, error }) => {
          if (error) return <ErrorMessage error={error} />;
          if (loading) return <Loader />;
          console.log(data)
          return <Feed feed={data.currentUser.feed} />
        }}
      </Query>
    </div>
  )
}

export default Home;
