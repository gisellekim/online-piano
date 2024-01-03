import styles from "./Logo.module.css"

export const Logo = () => {
  return (
    <h1 className={styles.logo}>
      <span role="img" aria-label="musical keyboard emoji">
        🎹
      </span>
    </h1>
  )
}
