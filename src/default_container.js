import React from 'react';
import { Navigation } from "./components";
import { NotificationContainer } from 'react-notifications';
import {
  Home,
  Bookmarks,
  Notifications,
  UserProfile,
  PodcastShow,
  CreatePodcast
} from "./pages";
import { PrivateRoute } from "./auth";

import 'react-notifications/lib/notifications.css';

const DefaultContainer = () => (
  <div>
    <Navigation />
    <PrivateRoute path="/u/:username" component={UserProfile} />
    <div className="container">
      <NotificationContainer />
      <PrivateRoute path="/podcast/:slug" component={PodcastShow} />
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/bookmarks" component={Bookmarks} />
      <PrivateRoute path="/notifications" exact component={Notifications} />
      <PrivateRoute path="/create-podcast" exact component={CreatePodcast} />
    </div>
  </div>
)

export default DefaultContainer;
