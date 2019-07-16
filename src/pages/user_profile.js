import React from "react";
import { Query } from "react-apollo";
import { ErrorMessage, Loader } from '../components';
import { GET_USER } from "../actions";

const UserProfile = ({ match }) => {
  console.log(match)
  return(
    <Query query={GET_USER} variables={match.params} >
      {({ data, loading, error }) => {
        if (loading) return <Loader />;
        if (error) return <ErrorMessage error={error} />;

        return (
          <div id="user-profile">
            hello user
          </div>
        )
      }}
    </Query>
  )
}

export default UserProfile;
