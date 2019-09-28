import React from "react";

const Notification = ({ notifier, rek: { id, episode }, type, satoshis }) => {
  const index = {
    bookmark: {
      icon: "bookmark",
      copy: "Bookmarked"
    },
    rek: {
      icon: "coins",
      copy: "Rerek'd"
    }
  };

  return(
    <div className="item notification-card">
      <div className={`fa fa-${index[type].icon} bookmark-notification`}></div>
      <div className="notification-description">
        <a href={"/u/" + notifier.username}>
          <img src={notifier.profilePic} alt={"avatar"} className="rounded-circle profile-pic" width={"40px"} />
        </a>
        <div>
          <a href={"/u/" + notifier.username}>
            <span className="font-weight-bold rek-username">{notifier.username} </span>
          </a>
          {index[type].copy} your Rek of
          <a href={`/podcast/${episode.podcast.slug}`}>
            <span className="font-weight-bold rek-username"> {episode.podcast.title}'s </span>
          </a>
          <span>Episode, </span>
          <a className="rek-episode-details font-weight-bold" href={`/episode/${episode.id}?rekId=${id}`}>{episode.title}</a>
        </div>
        {type === "rek" ?
          <div className="sats-stacked">
            You stacked
            <span className="font-weight-bold"> {satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</span> Sats
          </div>
          : null}
      </div>
    </div>
  )
}

export default Notification;

/*
userId (person being notified)
notifierId (person causing the notification)
rekId
type (bookmark | rek)
*/
