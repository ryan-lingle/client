import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContainer } from "../auth";
import DefaultContainer from "../default_container";
import { TwitterCallback } from "../pages";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={AuthContainer}/>
          <Route exact path="/auth/twitter/callback/:type" component={TwitterCallback} />
          <Route component={DefaultContainer}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
