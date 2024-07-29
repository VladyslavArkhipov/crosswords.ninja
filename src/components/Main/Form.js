"use client";
import { crossgen } from "../../utils/crossgen";
import React, { useState } from "react";
import styles from "./Form.module.css"; // Импортируйте CSS-модуль
import { useRouter } from "next/navigation"; // Импортируем хук useRouter

import InputTag from "../common/InputTag/InputTag";

export default function Form() {
  const [words, setWords] = useState("");
  const router = useRouter(); // Создаем экземпляр роутера
  const [error, setError] = useState(false);
  const errorMessage = "With these words we can't make a crossword!";

  function handleChange(event) {
    setWords(event.target.value);
  }

  // Удаленные части кода для отправки запроса к ChatGPT
  async function handleClick() {
    const [isCrosswordGeneratedSuccesfully, wordsDirection] = crossgen(
      1,
      words
    );
    if (!isCrosswordGeneratedSuccesfully) setError(true);
    if (isCrosswordGeneratedSuccesfully) {
      try {
        // Удаленный код, отправляющий запросы к ChatGPT
        const response = await fetch("/api/submitWords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ words }),
        });

        if (response.ok) {
          const data = await response.json();

          // Обработка данных, если необходимо

          // Перенаправление на страницу с кроссвордом
          const query = encodeURIComponent(JSON.stringify({ words }));
          router.push(`/generatedCrossword?data=${query}`);
        } else {
          console.error("Error submitting words");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <div className="content">
      <div className="crossgen">
        <div className="form">
          {error && <p className="error">{errorMessage}</p>}
          <div className={styles.words}>
            <div className={styles.textarreaWrapper}>
              <InputTag setWords={setWords} />{" "}
            </div>
            <p className={styles.text}>
              *The first word you insert becomes the main theme of your
              crossword puzzle.
            </p>
          </div>
          <div className={styles.controls}>
            <button onClick={handleClick} className={styles.button}>
              Generate
            </button>
          </div>
        </div>
        <div className="result"></div>
      </div>
    </div>
  );
}
