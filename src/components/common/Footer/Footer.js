import styles from "./Footer.module.css"; // Импортируйте CSS-модуль

export default function Footer(props) {
  return (
    <footer className={styles.footer}>
      <p
        className={`${
          props.isCrosswordGenerated ? styles.footer_light : styles.footer_dark
        } bodyS bodySMedium`}
      >
        © 2024 Uxrs.team, All Rights Reserved
      </p>
    </footer>
  );
}
