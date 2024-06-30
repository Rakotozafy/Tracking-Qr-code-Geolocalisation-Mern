/*eslint-disable*/
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Mag from './components/magasinier/Mag_auth'

import Client from "layouts/Client.js"
import Admin from "layouts/Admin.js";

import Accueil from 'Accueil';

import PrivateRoute from './PrivateRoute';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Switch>


          <Route path="/accueil" exact component={() => (!user ? <Accueil /> : <Redirect to="/" />)} />

          <Route path="/" exact component={() =>
            user ? (
              user.result.role === "admin" ? <Redirect to="/admin" /> :
                <Redirect to="/client" />
            ) : <Redirect to="/accueil" />
          }
          />

            <PrivateRoute path="/admin" excact component={Admin} />

            <PrivateRoute path="/client"  component={Client} />

          {/* user ? (
          {user.result.role === "admin" ? <PrivateRoute path="/admin" component={Admin} />: <PrivateRoute path="/client" component={Client} /> } )
           : <Redirect to="/accueil" /> */}






        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;