import React from "react";
import { Query } from "react-apollo";
import { ErrorMessage, Loader, UserNav } from '../components';
import { GET_USER } from "../actions";

const UserProfile = ({ match, location }) => {
  return(
    <Query query={GET_USER} variables={match.params} >
      {({ data, loading, error }) => {
        if (loading) return <Loader />;
        if (error) return(
          <div id="user-profile"className="text-center">
            <ErrorMessage error={error} />
          </div>
        );
        const tab = location.search.split('?tab=')[1];
        return (
          <div id="user-profile">
            <UserNav {...data.user} tab={tab} />
          </div>
        )
      }}
    </Query>
  )
}

export default UserProfile;
