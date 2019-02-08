import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './style.css';

class Recipes extends Component {
  state = { recipes: [] };

  componentDidMount() {
    fetch(`/api/categories/${this.props.match.params.id}/recipe/`)
      .then(res => res.json())
      .then(data => this.setState({ recipes: data.data }));
  }

  render() {
    return (
      <div className="recipes">
        <h2>Recept</h2>
        {this.state.recipes.map(recipe => (
          <div key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Recipes;
