import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Mina recept</h1>
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/">Hem</Link>
            <Link to="/categories">Kategorier</Link>
            <Link to="/addRecipe">Lägg till recept</Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default App;
