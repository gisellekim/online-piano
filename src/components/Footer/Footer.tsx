import styles from "./Footer.module.css"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <a target="_blank" href="https://yaji.sk">
        Giselle Kim
      </a>
      <br />
      {currentYear}
    </footer>
  )
}
