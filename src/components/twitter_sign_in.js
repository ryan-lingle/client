import React from "react";
import { Mutation } from "react-apollo";
import { TWITTER_TOKEN } from "../actions";
import { ErrorMessage } from ".";
import TwitterLogo from "../Twitter_Logo_Blue.png";

const TwitterSignIn = ({ write }) => {
  const handleTwitterToken = ({ twitterToken }) => {
    window.location.href = `https://twitter.com/oauth/authenticate?oauth_token=${twitterToken}`
  }

  return(
    <Mutation mutation={TWITTER_TOKEN} onCompleted={handleTwitterToken} >
      {(requestTwitterToken, { error }) => (
        <div>
          <ErrorMessage error={error} />
          <button className="sign-in-btn" onClick={() => requestTwitterToken({ variables: { write }})}>
            <img src={TwitterLogo} width={'30px'} alt="twitter-logo" />
            {write ? 'Grant Rekr Access' : 'Sign In with Twitter'}
          </button>
        </div>
      )}
    </Mutation>
  )
}

export default TwitterSignIn;
