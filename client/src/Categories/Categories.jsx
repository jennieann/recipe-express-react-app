import React, { Component } from "react"
import { Link } from "react-router-dom"
import styles from "./Categories.module.css"
class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      subCategories: []
    }
  }

  componentWillMount() {
    Promise.all([fetch("/api/subcategories"), fetch("/api/categories")])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          subCategories: data1.data,
          categories: data2.data
        })
      )
  }

  renderCategories = () => {
    const categories = this.state.categories
    const subCategories = this.state.subCategories
    return categories.map(category => (
      <li key={category.id} className={styles.categoriesSection}>
        <ul className={styles.subList}>
          <li className={styles.listItem}>
            <Link
              to={`/recipes/${category.id}`}
              id={category.id}
              className={styles.mainCategory}
            >
              {category.name}
            </Link>
          </li>
          {subCategories.map(sub => {
            let subNameListItem
            if (sub.parent_id === category.id) {
              subNameListItem = (
                <li className={styles.listItem} key={sub.id}>
                  <Link
                    to={`/sub_categories/${sub.id}/recipe`}
                    id={category.id}
                    className={styles.subCategory}
                  >
                    {sub.name}
                  </Link>
                </li>
              )
            }
            return subNameListItem
          })}
        </ul>
      </li>
    ))
  }

  render() {
    return (
      <div className={styles.categoriesWrapper}>
        <div className={styles.categories}>
          <h2 className={styles.header}>Kategorier</h2>
          <ul className={styles.list}>{this.renderCategories()}</ul>
        </div>
      </div>
    )
  }
}

export default Categories
