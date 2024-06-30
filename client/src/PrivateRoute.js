/*eslint-disable*/
import React from 'react';
import { Redirect, Route } from 'react-router-dom'

import { useSelector } from "react-redux";


const PrivateRoute = ({ component: Component, ...rest }) => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    // <Route
    //   {...rest}
    //   render={props =>
    //     user ? (
    //       <Component {...props} />
    //     ) : (
    //       <Redirect to={{ pathname: '/accueil', state: { from: props.location } }} />
    //     )
    //   }
    // />
    <Route
      {...rest}
      render={(props) => {
        if (user === null) {
          return <Redirect to={{ pathname: '/accueil', state: { from: props.location } }} />;
        }
        return <Component {...props} />;
      }}
    />
  )
}

export default PrivateRoute