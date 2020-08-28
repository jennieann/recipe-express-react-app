import React, { Component } from "react"
import { checkLoggedIn, getCategories } from "../helpers.js"
import "./AddRecipe.css"

class AddRecipe extends Component {
  state = { user: null, recipe: {}, subCategories: [], categories: [] }
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async getRecipeAsync(recipeId) {
    let response = await fetch(`/api/recipes/${recipeId}`)
    let data = await response.json()

    return data
  }

  async getUser() {
    let response = await fetch("/api/user")
    let user = await response.json()
    return user
  }

  async getSubCategories() {
    let response = await fetch("/api/subcategories")
    let subCategories = await response.json()
    return subCategories
  }

  componentDidMount() {
    getCategories().then(categories => {
      this.setState({ categories: categories })
    })

    if (this.getRecipeID()) {
      this.getRecipeAsync(this.getRecipeID()).then(data => {
        this.setState({ recipe: data.data })
      })
    }
    this.getUser().then(user => this.setState({ user: user.user }))

    this.getSubCategories().then(data => {
      this.setState({ subCategories: data.data })
    })
  }

  getRecipeID() {
    const recipeId = window.location.href.split("/")[5]
    return recipeId
  }

  handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const recipeId = this.getRecipeID()
    if (recipeId) {
      fetch(`/api/recipes/${recipeId}`, {
        method: "PUT",
        body: data
      })
    } else {
      fetch("/api/recipes", {
        method: "POST",
        body: data
      })
    }
  }

  render() {
    const isLoggedIn = checkLoggedIn(this.state.user)

    const recipe = this.state.recipe

    const {
      ingredients,
      time_cooking,
      description,
      name,
      sub_category_id
    } = recipe

    const subCategories = this.state.subCategories

    const subCategoryOptions = []

    const cats = this.state.categories

    subCategories.forEach(function(subCategoryItem) {
      const category = cats.find(cat => cat.id === subCategoryItem.parent_id)

      const categoryName = category.name

      subCategoryOptions.push(
        <option
          value={subCategoryItem.id}
          selected={sub_category_id === subCategoryItem.id ? "selected" : null}
        >
          {subCategoryItem.name} ({categoryName})
        </option>
      )
    })

    return (
      <div className="recipe-form-wrapper">
        {isLoggedIn ? (
          <div>
            <form onSubmit={this.handleSubmit} className="recipe-form">
              <label htmlFor="name">Receptnamn</label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={recipe ? name : ""}
              />

              <label htmlFor="ingredients">Ingredienser</label>
              <textarea
                cols="50"
                rows="10"
                id="ingredients"
                name="ingredients"
                type="text"
                value={this.state.recipe.ingredients}
                defaultValue={recipe ? ingredients : ""}
              />

              <label htmlFor="description">Beskrivning</label>
              <textarea
                cols="50"
                rows="10"
                id="description"
                name="description"
                type="text"
                value={this.state.recipe.ingredients}
                defaultValue={recipe ? description : ""}
              />

              <label htmlFor="time_cooking">Tidsåtgång</label>
              <input
                id="time_cooking"
                name="time_cooking"
                type="text"
                defaultValue={recipe ? time_cooking : ""}
              />

              <label htmlFor="difficulty">Svårighetsgrad</label>
              <select id="difficulty" name="difficulty">
                <option
                  value="Lätt"
                  selected={recipe.difficulty === "Lätt" ? "selected" : ""}
                >
                  Lätt
                </option>
                <option
                  value="Medel"
                  selected={recipe.difficulty === "Medel" ? "selected" : ""}
                >
                  Medel
                </option>
                <option
                  value="Svår"
                  selected={recipe.difficulty === "Svår" ? "selected" : ""}
                >
                  Svårt
                </option>
              </select>

              <label htmlFor="category">Kategori</label>
              <select id="categories_id" name="categories_id">
                <option
                  value="3"
                  selected={recipe.categories_id === 3 ? "selected" : ""}
                >
                  Förrätt
                </option>
                <option
                  value="4"
                  selected={recipe.categories_id === 4 ? "selected" : ""}
                >
                  Middag
                </option>
                <option
                  value="1"
                  selected={recipe.categories_id === 1 ? "selected" : ""}
                >
                  Dessert
                </option>
                <option
                  value="5"
                  selected={recipe.categories_id === 5 ? "selected" : ""}
                >
                  Bakning
                </option>
              </select>
              <label htmlFor="sub_category_id">Underkategori</label>
              <select id="sub_category_id" name="sub_category_id">
                {subCategoryOptions}
              </select>
              {this.state.recipe ? (
                <button>Uppdatera recept</button>
              ) : (
                <button>Lägg till recept</button>
              )}
            </form>
          </div>
        ) : (
          <div>
            <p>Ej Inloggad visa inloggnings formulär</p>
          </div>
        )}
      </div>
    )
  }
}

export default AddRecipe
