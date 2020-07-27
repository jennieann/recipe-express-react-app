import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { checkLoggedIn, getCategoryName } from '../helpers.js';
import './Recipe.css';

class Recipe extends Component {
  state = {
    recipe: {},
    ingredients: '',
    user: null,
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

    fetch('/api/user')
      .then((res) => res.json())
      .then((user) => this.setState({ user: user.user }));
  }

  renderIgredients = (ingredients) => {
    const ingredientsList = ingredients.split(';');
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
          <h2>
            <a href="/#/categories" className="bread-crum">
              Kategorier
            </a>
            <span className="arrow">{'>'}</span>
            <a href="/#/recipes/1" className="bread-crum">
              {getCategoryName(this.state.recipe.categories_id)}
            </a>
          </h2>
          <h2 className="recipe-title">{this.state.recipe.name}</h2>
          <span>
            Svårighetsgrad: {this.state.recipe.difficulty}&nbsp;|&nbsp;
            <i class="far fa-clock" /> {this.state.recipe.time_cooking}
          </span>
          <h3>Ingredienser</h3>
          <div className="text">{this.state.ingredients}</div>

          <h3>Gör så här:</h3>
          <div className="text">{this.state.description}</div>
          {checkLoggedIn(this.state.user) && (
            <Link to={`/updateRecipe/${this.state.recipe.id}`}>
              Editera <i class="far fa-edit" />
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default Recipe;
