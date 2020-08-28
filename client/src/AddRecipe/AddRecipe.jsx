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

  renderSubCategoryOptions() {
    const subCategories = this.state.subCategories
    const categories = this.state.categories
    const subCategoryOptions = []
    const subCategoryId = this.state.recipe.sub_category_id

    subCategories.forEach(function(subCategoryItem) {
      const category = categories.find(
        cat => cat.id === subCategoryItem.parent_id
      )
      const categoryName = category.name

      subCategoryOptions.push(
        <option
          value={subCategoryItem.id}
          selected={subCategoryId === subCategoryItem.id ? "selected" : null}
        >
          {subCategoryItem.name} ({categoryName})
        </option>
      )
    })
    return subCategoryOptions
  }

  renderCategoryOption() {
    const cats = this.state.categories
    const categoryOptions = []
    const categoryId = this.state.recipe.categories_id

    cats.forEach(function(categoryItem) {
      categoryOptions.push(
        <option
          value={categoryItem.id}
          selected={categoryId === categoryItem.id ? "selected" : null}
        >
          {categoryItem.name}
        </option>
      )
    })
    return categoryOptions
  }

  render() {
    const isLoggedIn = checkLoggedIn(this.state.user)

    const recipe = this.state.recipe

    const { ingredients, time_cooking, description, name } = recipe

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
                {this.renderCategoryOption()}
              </select>
              <label htmlFor="sub_category_id">Underkategori</label>
              <select id="sub_category_id" name="sub_category_id">
                {this.renderSubCategoryOptions()}
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
