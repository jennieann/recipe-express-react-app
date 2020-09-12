import { getAllCategoriesFromAPI, getCategoriesFromAPI } from "./Api.js"

export const checkLoggedIn = user => {
  let isLoggedIn = false
  if (user != null) {
    return (isLoggedIn = true)
  }
  return isLoggedIn
}

export const getCategoryName = async categoryId => {
  const categoriesNames = await getAllCategoriesFromAPI()
  console.log("ID In", categoryId)
  const category = categoriesNames.find(category => {
    console.log("ID", category.id)
    return category.id === categoryId
  })

  return category.name
}

export const getCategories = async categoryId => {
  const categories = await getCategoriesFromAPI()

  return categories
}

export default checkLoggedIn
