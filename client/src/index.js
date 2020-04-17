import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Categories from './Categories/Categories';
import Recipes from './Recipes/Recipes';
import Recipe from './Recipe/Recipe';
import AddRecipe from './AddRecipe/AddRecipe';

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/categories/" component={Categories} />
      <Route path="/recipes/:id" component={Recipes} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/addRecipe/" component={AddRecipe} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
