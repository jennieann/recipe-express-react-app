import React, { Component } from 'react';

import './Recipe.css';

class Recipe extends Component {
  state = {
    recipe: {},
    ingredients: '',
  };

  componentDidMount() {
    fetch(`/api/recipes/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          recipe: data.data,
        });
        this.setState({
          ingredients: this.renderIgredients(this.state.recipe.ingredients),
          description: this.renderDescription(this.state.recipe.description),
        });
      });
  }

  renderIgredients = (ingredients) => {
    const ingredientsList = ingredients.split('/n');
    return (
      <ul>
        {ingredientsList.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>;
        })}
      </ul>
    );
  };

  renderDescription = (description) => {
    const descriptionText = description.split(';');
    return (
      <ol>
        {descriptionText.map((step, index) => {
          return <li key={index}>{step}</li>;
        })}
      </ol>
    );
  };

  render() {
    return (
      <div className="recipesWrapper">
        <div className="recipe">
          <h2>{this.state.recipe.name}</h2>
          <span>
            Svårighetsgrad: {this.state.recipe.difficulty}&nbsp; Tid:
            {this.state.recipe.time_cooking}
          </span>
          <h3>Ingredienser</h3>
          <div className="text">{this.state.ingredients}</div>

          <h3>Gör så här:</h3>
          <div className="text">{this.state.description}</div>
        </div>
      </div>
    );
  }
}

export default Recipe;
