import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './component/HomePage';
import 'semantic-ui-css/semantic.min.css';
import AppointmentForm from './component/AppointmentForm';
import { routes } from './util/routes';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path={'/'} exact={true} component={HomePage} />
        <Route
          path={routes.REQUEST_AN_APPOINTMENT}
          component={AppointmentForm}
        />
      </Router>
    );
  }
}

export default App;
