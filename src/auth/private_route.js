import React from "react";
import {
  Route,
  Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return(
    <Route {...rest} render={(props) => (
      localStorage.getItem('token') != null
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login?warning=1',
          state: { from: props.location.pathname }
        }} />
    )} />
  )
}

export default PrivateRoute;
