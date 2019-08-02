import React from "react";
import { createStream, Episode } from "../components";
import { BOOKMARKS } from '../actions';

const Bookmarks = ({ match }) => {
  const Stream = createStream(Episode);
  return(
    <div id="home" >
      <Stream query={BOOKMARKS} />
    </div>
  )
}

export default Bookmarks;
