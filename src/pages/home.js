import React from "react";
import { createStream, Rek, UserBox } from "../components";
import { FEED_STREAM } from '../actions';

const Home = ({ match }) => {
  const Stream = createStream(Rek);
  return(
    <div id="home" >
      <UserBox />
      <Stream query={FEED_STREAM} />
    </div>
  )
}

export default Home;
