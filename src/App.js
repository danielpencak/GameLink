import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Parent from './Parent';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import Session from './Session/Session';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Parent}>
          <IndexRoute component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/session/create' component={Session} />
          <Route path='/session/:sessionId' component={Session} />
        </Route>
      </Router>
    );
  }
}

export default App;
