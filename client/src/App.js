import React, { Component } from "react"

import {
  HashRouter as Router,
  NavLink,
  Route,
  Redirect
} from "react-router-dom"
import AddRecipe from "./AddRecipe/AddRecipe"
import "./App.css"
import Home from "./Home/Home"
import Categories from "./Categories/Categories"
import Recipe from "./Recipe/Recipe"
import Recipes from "./Recipes/Recipes"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="App">
            <h1 className="header">Mina recept</h1>
            <nav className="navbar">
              <div className="navbar-container">
                <NavLink
                  exact
                  to="/home"
                  className="nav-link"
                  activeClassName="nav-link-active"
                >
                  Hem
                </NavLink>
                <NavLink
                  exact
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
          <div>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/categories/" component={Categories} />
            <Route path="/recipes/:id" component={Recipes} />
            <Route path="/recipe/:id" component={Recipe} />
            <Route path="/sub_categories/:id/recipe" component={Recipes} />
            <Route path="/addRecipe/" component={AddRecipe} />
            <Route
              path="/updateRecipe/"
              key={Math.random()}
              component={AddRecipe}
            />
          </div>
        </div>
      </Router>
    )
  }
}
export default App
