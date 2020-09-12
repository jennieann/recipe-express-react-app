import React, { Component } from "react"
import { Link } from "react-router-dom"
import { checkLoggedIn, getCategoryName } from "../helpers.js"
import styles from "./Recipe.module.css"

class Recipe extends Component {
  state = {
    recipe: {},
    ingredients: "",
    user: null,
    categoryName: "",
    subCateoryName: ""
  }

  componentDidMount() {
    fetch(`/api/recipes/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          recipe: data.data
        })
        this.setState({
          ingredients: this.renderIgredients(this.state.recipe.ingredients),
          description: this.renderDescription(this.state.recipe.description)
        })

        getCategoryName(this.state.recipe.categories_id).then(categoryName => {
          this.setState({
            categoryName: categoryName
          })
        })

        getCategoryName(this.state.recipe.sub_category_id).then(
          subCategoryName => {
            this.setState({
              subCategoryName: subCategoryName
            })
          }
        )
      })

    fetch("/api/user")
      .then(res => res.json())
      .then(user => this.setState({ user: user.user }))
  }

  renderIgredients = ingredients => {
    const ingredientsList = ingredients.split(";")
    return (
      <ul>
        {ingredientsList.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>
        })}
      </ul>
    )
  }

  renderDescription = description => {
    const descriptionText = description.split(";")
    return (
      <ol>
        {descriptionText.map((step, index) => {
          return <li key={index}>{step}</li>
        })}
      </ol>
    )
  }

  render() {
    return (
      <div className={styles.recipesWrapper}>
        <div className={styles.recipe}>
          <div className={styles.recipeDescriptionWrapper}>
            <div>
              <Link to="/categories" className={styles.breadCrum}>
                Kategorier
              </Link>
              <span className={styles.arrow}>{">"}</span>
              <Link
                to={`/recipes/${this.state.recipe.categories_id}`}
                className={styles.breadCrum}
              >
                {this.state.categoryName}
              </Link>
              <span className={styles.arrow}>{">"}</span>
              <Link
                to={`/sub_categories/${
                  this.state.recipe.sub_category_id
                }/recipe/`}
                className={styles.breadCrum}
              >
                {this.state.subCategoryName}
              </Link>
            </div>
            <h2 className={styles.recipeTitle}>{this.state.recipe.name}</h2>
            <span>
              Svårighetsgrad: {this.state.recipe.difficulty}&nbsp;|&nbsp;
              <i class="far fa-clock" /> {this.state.recipe.time_cooking}
            </span>
            <h3>Ingredienser</h3>
            <div className="text">{this.state.ingredients}</div>

            <h3>Gör så här:</h3>
            <div className="text">{this.state.description}</div>
            {checkLoggedIn(this.state.user) && (
              <Link
                to={`/updateRecipe/${this.state.recipe.id}`}
                className={styles.edithIcon}
              >
                <span className={styles.iconText}>Editera</span>{" "}
                <i class="far fa-edit" />
              </Link>
            )}
          </div>
          <div className={styles.recipeImageWrapper}>
            <figure className={styles.figure}>
              <img
                alt={this.state.recipe.name}
                className={styles.image}
                src="https://mittkok.expressen.se/wp-content/uploads/2017/05/skarmavbild-2017-07-12-kl--13-54-14.png"
              />
            </figure>
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe
