import React from "react";
import { createStream, Rek, UserBox, HashtagBox } from "../components";
import { FEED_STREAM, CURRENT_USER } from '../actions';
import { Query } from "react-apollo";


const Home = ({ match }) => {
  const Stream = createStream(Rek);
  return(
    <div>
      <Query query={CURRENT_USER} >
        {({ data, error, loading}) => {
          if (error || loading) return <div></div>
          const { currentUser } = data;

          return (
            <div id="home" className="row">
              <div className="col-md-12 col-lg-3 user-box-col">
                <UserBox {...currentUser} />
              </div>
              <div className="col-lg-6 col-md-12 feed-col">
                <Stream query={FEED_STREAM} />
              </div>
              <div className="col-sm-3 d-sm-none d-md-block hashtag-col">
                <HashtagBox hashtags={currentUser.followedHashtags} />
              </div>
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default Home;
