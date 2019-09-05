import React from "react";
import { createStream, Notification } from "../components";
import { NOTIFICATIONS } from '../actions';

const Notifications = ({ match }) => {
  const Stream = createStream(Notification);
  return(
    <div id="home" >
      <Stream query={NOTIFICATIONS} />
    </div>
  )
}

export default Notifications;
