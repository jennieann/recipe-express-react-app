export const getCategoriesFromAPI = () => {
  return fetch("/api/categories")
    .then(res => res.json())
    .then(data => {
      const categories = data.data

      return categories
    })
}

export const getAllCategoriesFromAPI = () => {
  return fetch("/api/all_categories")
    .then(res => res.json())
    .then(data => {
      const categories = data.data

      return categories
    })
}
