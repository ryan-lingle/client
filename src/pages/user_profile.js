import React from "react";
import { Query } from "react-apollo";
import { ErrorMessage, Loader, UserNav } from '../components';
import { GET_USER } from "../actions";

const UserProfile = ({ match }) => {
  return(
    <Query query={GET_USER} variables={match.params} >
      {({ data, loading, error }) => {
        if (loading) return <Loader />;
        if (error) return(
          <div id="user-profile"className="text-center">
            <ErrorMessage error={error} />
          </div>
        );
        const currentUser = data.user.id === localStorage.getItem("id");
        return (
          <div id="user-profile">
            <UserNav {...data.user} currentUser={currentUser} />
          </div>
        )
      }}
    </Query>
  )
}

export default UserProfile;
