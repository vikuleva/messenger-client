import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Router, withRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Main } from './components/Main'

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <Main />
  </Router>,
  document.getElementById('root')
);
