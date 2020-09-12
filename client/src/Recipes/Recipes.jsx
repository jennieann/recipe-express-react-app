import React, { Component } from "react"
import { Link } from "react-router-dom"
import styles from "./Recipes.module.css"

class Recipes extends Component {
  state = { recipes: [] }

  componentDidMount() {
    if (window.location.href.indexOf("sub_categorie") !== -1) {
      fetch(`/api/sub_categories/${this.props.match.params.id}/recipe/`)
        .then(res => res.json())
        .then(data => this.setState({ recipes: data.data }))
    } else {
      fetch(`/api/categories/${this.props.match.params.id}/recipe/`)
        .then(res => res.json())
        .then(data => this.setState({ recipes: data.data }))
    }
  }

  render() {
    return (
      <div className={styles.recipesWrapper}>
        <div className={styles.recipes}>
          <h2 className={styles.header}>Recept</h2>
          {this.state.recipes.map(recipe => (
            <div key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`} className={styles.recipe}>
                {recipe.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Recipes
