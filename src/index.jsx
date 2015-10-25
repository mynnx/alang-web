import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState, setConnectionState} from './action_creators';
import getClientId from './client_id';
import App from './components/App';
import {ResultsContainer} from './components/Results';

require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}`);
socket.on('state', state => {
  console.log('Got some state!', state)
  store.dispatch(setState(state))
});
[
  'connect',
  'connect_error',
  'connect_timeout',
  'reconnect',
  'reconnecting',
  'reconnect_error',
  'reconnect_failed'
].forEach(ev =>
  socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
);

const store = createStore(reducer);
store.dispatch(setClientId(getClientId()));

const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
