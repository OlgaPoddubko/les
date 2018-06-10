import React from 'react';
import { Provider } from 'redux';
import { Router, Route } from 'react-router';
//import { Router, Route, browserHistory } from 'react-router'; - для старых брайзеров
// <Router history={browserHistory}>
import App from './components/App';

const Root = ({store}) => (
  <Provider store = {store}>
    <Router>
      <Route path='/(:filter)' component={App} />
    </Router>
  </Provider>
);

export default Root;
