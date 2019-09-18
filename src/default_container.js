import React from 'react';
import { Navigation } from "./components";
import { NotificationContainer } from 'react-notifications';
import {
  Home,
  Bookmarks,
  Notifications,
  ModalMounter,
  UserProfile,
  PodcastShow,
  CreatePodcast,
  Search,
  HashtagFeed,
  EmailUnconfirmed,
  ConfirmEmail,
  PodcastDashboard
} from "./pages";
import { Route } from 'react-router-dom';
import { PrivateRoute } from "./auth";

import 'react-notifications/lib/notifications.css';

const DefaultContainer = () => (
  <div>
    <Navigation />
    <PrivateRoute component={ModalMounter} />
    <PrivateRoute path="/u/:username" exact component={UserProfile} />
    <PrivateRoute path="/search" exact component={Search} />
    <PrivateRoute path="/" exact component={Home} />
    <Route path="/hashtag/:name" component={HashtagFeed} />
    <PrivateRoute path="/podcast-dashboard" exact component={PodcastDashboard} />
    <div className="container">
      <NotificationContainer />
      <PrivateRoute path="/email_unconfirmed" exact component={EmailUnconfirmed} />
      <PrivateRoute path="/confirm_email/:token" component={ConfirmEmail} />
      <PrivateRoute path="/podcast/:slug" component={PodcastShow} />
      <PrivateRoute path="/bookmarks" component={Bookmarks} />
      <PrivateRoute path="/notifications" exact component={Notifications} />
      <PrivateRoute path="/create-podcast" exact component={CreatePodcast} />
    </div>
  </div>
)

export default DefaultContainer;
