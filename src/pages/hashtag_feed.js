import React, { useState } from "react";
import { createStream, EpisodeDonations, UserBox, HashtagBox, FollowButton, Loader, ErrorMessage } from "../components";
import { HASHTAG_FEED, GET_HASHTAG, CURRENT_USER } from '../actions';
import { Query } from "react-apollo";
import { useSubNav } from "../hooks";

const TimePeriodSelector = ({ timePeriod, onChange }) => {
  const [showTimes, setShowTimes] = useState(false);

  function current(time) {
    console.log(time);
    return timePeriod === time ? " current-time-period" : "";
  };

  function timePeriodOptions(on) {
    return(
      <div style={{ display: on ? "" : "none"}}className="time-period-list" onMouseEnter={() => setShowTimes(true)} onMouseLeave={() => setShowTimes(false)}>
        <div
          className={"time-period" + current("week")}
          onClick={() => onChange("week")} >Week</div>
        <div
          className={"time-period" + current("month")}
          onClick={() => onChange("month")} >Month</div>
        <div
          className={"time-period" + current("all-time")}
          onClick={() => onChange("all-time")} >All-Time</div>
      </div>
    );
  };

  return(
    <i className="far fa-clock time-period-btn" onMouseEnter={() => setShowTimes(true)} onClick={() => setShowTimes(true)} >
      {timePeriodOptions(showTimes)}
    </i>
  );
};

const HashtagFeed = ({ match: { params }}) => {
  const [timePeriod, setTimePeriod] = useState("month");
  const isLoggedIn = localStorage.getItem('token');
  const Stream = createStream(EpisodeDonations);

  useSubNav();

  return(
    <div id="home">
      <Query query={GET_HASHTAG} variables={params} >
        {({ data, error, loading}) => {
          if (loading) return <div></div>;
          if (error) return <div id="home"><ErrorMessage error={error} /></div>;
          const { name, followedByCurrentUser, id } = data.hashtag;
          return (
            <div id="sub-nav">
              <h3 id="hashtag-header">
                {name}
              </h3>
              <TimePeriodSelector timePeriod={timePeriod} onChange={(timePeriod) => setTimePeriod(timePeriod)} />
              <FollowButton
                hashtagId={id}
                following={followedByCurrentUser}
                type={'hashtag'}
              />
            </div>
          );
        }}
      </Query>
      {isLoggedIn ? <Query query={CURRENT_USER} >
        {({ data, error, loading}) => {
          if (loading) return <Loader />;
          if (error) return <ErrorMessage error={error} />;

          const { currentUser } = data;
          console.log(timePeriod)
          return (
            <div className="row">
              <div className="col-md-12 col-lg-3 user-box-col">
                <UserBox {...currentUser} />
              </div>
              <div className="col-lg-6 col-md-12 feed-col">
                <Stream query={HASHTAG_FEED} variables={{...params, timePeriod}} />
              </div>
              <div className="col-sm-3 d-none d-lg-block hashtag-col">
                <HashtagBox hashtags={currentUser.followedHashtags} />
              </div>
            </div>
          )
        }}
      </Query>
      : <div className="col-lg-6 col-md-12 offset-md-3 feed-col">
          <Stream query={HASHTAG_FEED} variables={{...params, timePeriod}} />
        </div>}
    </div>
  )
};

export default HashtagFeed;
