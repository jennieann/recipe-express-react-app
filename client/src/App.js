import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="header">Mina recept</h1>
        <nav className="navbar">
          <div className="navbar-container">
            <NavLink
              exact
              to="/"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Hem
            </NavLink>
            <NavLink
              to="/categories"
              activeClassName="nav-link-active"
              className="nav-link"
            >
              Kategorier
            </NavLink>
            <NavLink
              to="/addRecipe"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Lägg till recept
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}

export default App;
