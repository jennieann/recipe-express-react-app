import React from "react"
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.home}>
        <h2 className={styles.header}>Senaste recepten</h2>
        <div className={styles.recipeContainer}>
          <div className={styles.recipe}>dlaf,mfamf fkaljfjakf</div>
          <div className={styles.date}>2021-10-24</div>
        </div>
      </div>
    </div>
  )
}

export default Home
