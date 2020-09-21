import React from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../../helpers';
import { Home, Register, Profile, Login, NotFound } from '../index';
import { PrivateRoute } from '../../components/index';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
          <Switch>
            <Redirect exact path="/" to="/login" />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
      </Router>
    );
  }
  
}

export default App;
