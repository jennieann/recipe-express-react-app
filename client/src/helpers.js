export const checkLoggedIn = user => {
  let isLoggedIn = false
  if (user != null) {
    return (isLoggedIn = true)
  }
  return isLoggedIn
}
const getCategoriesFromAPI = () => {
  return fetch("/api/categories")
    .then(res => res.json())
    .then(data => {
      const categories = data.data

      return categories
    })
}

export const getCategoryName = async categoryId => {
  const categoriesNames = await getCategoriesFromAPI()

  const category = categoriesNames.find(category => {
    return category.id === categoryId
  })

  return category.name
}

export const getCategories = async categoryId => {
  const categories = await getCategoriesFromAPI()

  return categories
}

export default checkLoggedIn
