import styles from "./Logo.module.css"

export const Logo = () => {
  return (
    <h1 className={styles.logo}>
      <span aria-label="musical keyboard">Online Piano Player</span>
    </h1>
  )
}
