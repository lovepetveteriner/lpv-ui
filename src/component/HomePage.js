import logo from '../logo.jpeg';
import '../App.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../util/routes';

class HomePage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <br />
          <p>Yakinda Burada.</p>
          <Link to={routes.REQUEST_AN_APPOINTMENT}>Randevu Al</Link>
        </header>
      </div>
    );
  }
}

export default HomePage;
