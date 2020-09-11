import React, { Component } from "react"
import { checkLoggedIn, getCategories } from "../helpers.js"
import styles from "./AddRecipe.module.css"

class AddRecipe extends Component {
  state = {
    user: null,
    recipe: { name: "" },
    subCategories: [],
    categories: []
  }
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  componentWillMount() {
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

    subCategories.forEach(function(subCategoryItem) {
      const category = categories.find(
        cat => cat.id === subCategoryItem.parent_id
      )
      const categoryName = category.name

      subCategoryOptions.push(
        <option value={subCategoryItem.id} key={subCategoryItem.id}>
          {subCategoryItem.name} ({categoryName})
        </option>
      )
    })
    return subCategoryOptions
  }

  renderCategoryOption() {
    const cats = this.state.categories
    const categoryOptions = []

    cats.forEach(function(categoryItem) {
      categoryOptions.push(
        <option value={categoryItem.id} key={categoryItem.id}>
          {categoryItem.name}
        </option>
      )
    })
    return categoryOptions
  }

  handleChange(event) {
    this.setState({
      recipe: { ...this.state.recipe, [event.target.name]: event.target.value }
    })
  }

  render() {
    const isLoggedIn = checkLoggedIn(this.state.user)

    const recipe = this.state.recipe

    const {
      ingredients,
      time_cooking,
      description,
      name,
      categories_id,
      difficulty,
      sub_category_id
    } = recipe

    return (
      <div className={styles.recipeWrapper}>
        {isLoggedIn ? (
          <div>
            <form onSubmit={this.handleSubmit} className={styles.recipeForm}>
              <label htmlFor="name">Receptnamn</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={this.handleChange}
              />

              <label htmlFor="ingredients">Ingredienser</label>
              <textarea
                cols="50"
                rows="10"
                id="ingredients"
                name="ingredients"
                type="text"
                value={ingredients}
                onChange={this.handleChange}
              />

              <label htmlFor="description">Beskrivning</label>
              <textarea
                cols="50"
                rows="10"
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={this.handleChange}
              />

              <label htmlFor="time_cooking">Tidsåtgång</label>
              <input
                id="time_cooking"
                name="time_cooking"
                type="text"
                defaultValue={recipe ? time_cooking : ""}
              />

              <label htmlFor="difficulty">Svårighetsgrad</label>
              <select
                id="difficulty"
                name="difficulty"
                value={difficulty}
                onChange={this.handleChange}
              >
                <option value="Lätt">Lätt</option>
                <option value="Medel">Medel</option>
                <option value="Svår">Svårt</option>
              </select>

              <label htmlFor="category">Kategori</label>
              <select
                id="categories_id"
                name="categories_id"
                value={categories_id}
                onChange={this.handleChange}
              >
                {this.renderCategoryOption()}
              </select>
              <label htmlFor="sub_category_id">Underkategori</label>
              <select
                id="sub_category_id"
                name="sub_category_id"
                value={sub_category_id}
                onChange={this.handleChange}
              >
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
