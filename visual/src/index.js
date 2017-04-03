import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import store from './store.js';
import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
