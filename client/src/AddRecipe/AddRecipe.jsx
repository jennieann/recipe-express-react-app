import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { checkLoggedIn, getCategories } from "../helpers.js"
import styles from "./AddRecipe.module.css"
import classnames from "classnames"

const imageS3 = "https://recipe-app1-images.s3.eu-north-1.amazonaws.com"

//#Use when reading from local file system
//const images = "/images"

function AddRecipe() {
  const [user, setUser] = useState(null)
  const [recipe, setRecipe] = useState({ name: "" })
  const [subCategories, setSubCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [file, setFile] = useState(null)

  const getRecipeID = () => {
    const recipeId = window.location.href.split("/")[5]
    return recipeId
  }

  const getSubCategories = async () => {
    let response = await fetch("/api/subcategories")
    let subCategories = await response.json()
    return subCategories
  }

  const getUser = async () => {
    let response = await fetch("/api/user")
    let user = await response.json()
    return user
  }

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
    })
  }, [])

  if (getRecipeID()) {
    useEffect(() => {
      getRecipeAsync(getRecipeID()).then(data => {
        setRecipe(data.data)
      })
    }, [])
  }

  useEffect(() => {
    getUser().then(user => setUser(user.user))
  }, [])

  useEffect(() => {
    getSubCategories().then(data => {
      setSubCategories(data.data)
    })
  }, [])

  const getRecipeAsync = async recipeId => {
    let response = await fetch(`/api/recipes/${recipeId}`)
    let data = await response.json()

    return data
  }

  const isRecipeNameSet = () => {
    const recipeNameInputValue =
      document.forms["addRecipe"].elements["name"].value

    return recipeNameInputValue === "" ? false : true
  }

  const ErrorMessage = () => {
    isRecipeNameSet()
      ? setErrorMessage("")
      : setErrorMessage("Du måste fylla i ett namn")
  }

  const updateImage = data => {
    for (var value of data.values()) {
      if (typeof value === "object") {
        setRecipe({ ...recipe, image: value.name })
      }
    }
  }

  const saveRecipe = (recipeId, data) => {
    if (recipeId) {
      updateImage(data)
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

  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.target)
    if (isRecipeNameSet()) {
      ErrorMessage()
      saveRecipe(getRecipeID(), data)
    } else {
      ErrorMessage()
    }
  }

  const renderSubCategoryOptions = () => {
    const subCategoryOptions = []

    subCategories.forEach(function(subCategoryItem) {
      const category = categories.find(
        cat => cat.id === subCategoryItem.parent_id
      )
      const categoryName = category !== undefined ? category.name : ""

      subCategoryOptions.push(
        <option value={subCategoryItem.id} key={subCategoryItem.id}>
          {subCategoryItem.name} ({categoryName})
        </option>
      )
    })
    return subCategoryOptions
  }

  const renderCategoryOption = () => {
    const categoryOptions = []

    categories.forEach(function(categoryItem) {
      categoryOptions.push(
        <option value={categoryItem.id} key={categoryItem.id}>
          {categoryItem.name}
        </option>
      )
    })
    return categoryOptions
  }

  const handleChange = event => {
    const value =
      event.target.name === "new_image"
        ? event.target.files[0]
        : event.target.value
    //console.log(value)
    const { name } = event.target
    setRecipe({ ...recipe, [name]: value })

    if (name === "new_image") {
      setFile(URL.createObjectURL(value))
    }
  }

  return (
    <div className={styles.recipeWrapper}>
      {checkLoggedIn(user) ? (
        <div className={styles.formWrapper}>
          <div
            className={classnames(styles.errorMessage, {
              [styles.active]: errorMessage !== ""
            })}
          >
            {errorMessage}
          </div>
          <div className={styles.backToRecipe}>
            {getRecipeID() !== undefined && (
              <Link
                to={`/recipe/${getRecipeID()}`}
                className={styles.backToRecipeLink}
              >
                <span className={styles.arrow}>{"<<"}</span>Tillbaka till
                receptet
              </Link>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            name="addRecipe"
            className={styles.recipeForm}
            encType="multipart/form-data"
          >
            <label htmlFor="name">Receptnamn</label>
            <input
              id="name"
              name="name"
              type="text"
              value={recipe.name}
              onChange={handleChange}
              className={styles.input}
            />

            <label htmlFor="ingredients">Ingredienser</label>
            <textarea
              cols="50"
              rows="10"
              id="ingredients"
              name="ingredients"
              type="text"
              value={recipe.ingredients}
              onChange={handleChange}
              className={styles.textarea}
            />

            <label htmlFor="description">Beskrivning</label>
            <textarea
              cols="50"
              rows="10"
              id="description"
              name="description"
              type="text"
              value={recipe.description}
              onChange={handleChange}
              className={styles.textarea}
            />

            <label htmlFor="time_cooking">Tidsåtgång</label>
            <input
              id="time_cooking"
              name="time_cooking"
              type="text"
              defaultValue={recipe ? recipe.time_cooking : ""}
              className={styles.input}
            />

            <label htmlFor="difficulty">Svårighetsgrad</label>
            <select
              id="difficulty"
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="Lätt">Lätt</option>
              <option value="Medel">Medel</option>
              <option value="Svår">Svårt</option>
            </select>

            <label htmlFor="category">Kategori</label>
            <select
              id="categories_id"
              name="categories_id"
              value={recipe.categories_id}
              onChange={handleChange}
              className={styles.select}
            >
              {renderCategoryOption()}
            </select>
            <label htmlFor="sub_category_id">Underkategori</label>
            <select
              id="sub_category_id"
              name="sub_category_id"
              value={recipe.sub_category_id}
              onChange={handleChange}
              className={styles.select}
            >
              {renderSubCategoryOptions()}
            </select>

            {recipe.image !== undefined && file === null ? (
              <img
                name="image"
                className={styles.image}
                src={`${imageS3}/${recipe.image}`}
                alt={recipe.image}
              />
            ) : (
              <img
                name="image"
                className={styles.image}
                src={file}
                key={Date.now()}
                alt={recipe.image}
              />
            )}

            <input
              type="file"
              className={styles.file}
              onChange={handleChange}
              name="new_image"
            />
            {getRecipeID() !== undefined ? (
              <button className={styles.button}>Uppdatera recept</button>
            ) : (
              <button className={styles.button}>Lägg till recept</button>
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

export default AddRecipe
