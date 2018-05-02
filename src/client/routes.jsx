import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Main from './components/Main.jsx';
import Login from './components/Login.jsx';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Main} />
    <Route path='login' component={Login} />
    <Route path='*' component={Main} />
  </Route>
);
