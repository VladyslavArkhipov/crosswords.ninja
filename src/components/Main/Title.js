"use client";

import styles from "./Title.module.css"; // Импортируйте CSS-модуль

import Form from "./Form";

export default function Title() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <>
          <h1 className={styles.heading}>
            Make your crossword with AI Generator
          </h1>
          <h2 className={styles.subHeading}>
            Use words in any language. Simply insert the words, press generate
            and get crossword with clues.
          </h2>
        </>
        <Form></Form>
      </div>
    </div>
  );
}
