import React from "react";
import { createStream, Notification } from "../components";
import { NOTIFICATIONS } from '../actions';

const Notifications = ({ match }) => {
  const Stream = createStream(Notification);

  const onEmpty = () => (
    <div className="nothing-message">
      No Notifications Yet 🙃
    </div>
  )
  return(
    <div id="home" >
      <Stream query={NOTIFICATIONS} onEmpty={onEmpty} />
    </div>
  )
}

export default Notifications;
