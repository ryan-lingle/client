import React from "react";
import { Stream, Loader, ErrorMessage } from "../components";
import { Query } from "react-apollo";
import { BOOKMARKS } from '../actions';

const Bookmarks = ({ match }) => {
  return(
    <div id="home" >
      <Query query={BOOKMARKS}>
        {({ data, loading, error }) => {
          if (error) return <ErrorMessage error={error} />;
          if (loading) return <Loader />;
          return <Stream {...data.currentUser.bookmarks} type={"bookmarks"} />
        }}
      </Query>
    </div>
  )
}

export default Bookmarks;
