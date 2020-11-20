import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { checkLoggedIn, getCategoryName } from "../helpers.js"
import styles from "./Recipe.module.css"

const Recipe = () => {
  const [recipe, setRecipe] = useState({})
  const [user, setUser] = useState(null)
  const [categoryName, setCategoryName] = useState("")
  const [subCategoryName, setSubCategoryName] = useState("")

  const urlHash = window.location.hash.split("/")
  const recipeId = urlHash[2]

  useEffect(() => {
    fetch(`/api/recipes/${recipeId}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data.data)

        getCategoryName(data.data.sub_category_id).then(subCategoryName => {
          setSubCategoryName(subCategoryName)
        })

        getCategoryName(data.data.categories_id).then(categoryName => {
          setCategoryName(categoryName)
        })
      })
  }, [])

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(user => setUser(user.user))
  }, [])

  const renderIgredients = ingredients => {
    if (ingredients === undefined) return
    const ingredientsList = ingredients.split(";")
    return (
      <ul>
        {ingredientsList.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>
        })}
      </ul>
    )
  }

  const renderDescription = description => {
    if (description === undefined) return
    const descriptionText = description.split(";")
    return (
      <ol>
        {descriptionText.map((step, index) => {
          return <li key={index}>{step}</li>
        })}
      </ol>
    )
  }

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
              to={`/recipes/${recipe.categories_id}`}
              className={styles.breadCrum}
            >
              {categoryName}
            </Link>
            <span className={styles.arrow}>{">"}</span>
            <Link
              to={`/sub_categories/${recipe.sub_category_id}/recipe/`}
              className={styles.breadCrum}
            >
              {subCategoryName}
            </Link>
          </div>
          <h2 className={styles.recipeTitle}>{recipe.name}</h2>
          <span>
            Svårighetsgrad: {recipe.difficulty}&nbsp;|&nbsp;
            <i class="far fa-clock" /> {recipe.time_cooking}
          </span>
          <h3>Ingredienser</h3>
          <div className="text">{renderIgredients(recipe.ingredients)}</div>

          <h3>Gör så här:</h3>
          <div className="text">{renderDescription(recipe.description)}</div>
          {checkLoggedIn(user) && (
            <Link
              to={`/updateRecipe/${recipe.id}`}
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
              alt={recipe.name}
              className={styles.image}
              src={
                recipe.image
                  ? `/images/${recipe.image}`
                  : "/images/placeholder-food.png"
              }
            />
          </figure>
        </div>
      </div>
    </div>
  )
}

export default Recipe
