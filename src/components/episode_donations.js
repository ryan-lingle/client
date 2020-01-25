import React from "react";
import { Episode, Tooltip } from ".";
import { toSats } from "../utils";

const EpisodeDonations = ({ episode, satoshis, timePeriod, hashtag }) => {
  const { podcast } = episode;
  return(
    <Episode episode={episode} podcast={podcast} rekBtn={false} >
      <div className="episode-donations-header">
        <span className="rek-sats">{toSats(satoshis)}</span> received
        {timePeriod === "all-time" ? ` ${timePeriod}` : ` this ${timePeriod}`}
      </div>
    </Episode>
  );
}

export default EpisodeDonations;

/*
<Tooltip tooltip={`You are viewing the episodes that have the received the most donations this ${timePeriod}. Use this to change the time setting.`}>
  <i className="fa fa-question-circle" />
</Tooltip>
*/
