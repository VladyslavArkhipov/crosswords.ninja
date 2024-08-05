"use client";
import { crossgen } from "../../utils/crossgen";
import React, { useState } from "react";
import styles from "./Form.module.css"; // Импортируйте CSS-модуль
import { useRouter } from "next/navigation"; // Импортируем хук useRouter

import InputTag from "../common/InputTag/InputTag";
import ModalMessage from "../common/ModalMessage/ModalMessage";

export default function Form() {
  const [words, setWords] = useState("");
  const router = useRouter(); // Создаем экземпляр роутера
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const style = {
    marginTop: words.length > 80 ? "82px" : words.length > 40 ? "40px" : "",
  };
  const wordsArray = words.split(" ");

  function closeModal() {
    setError(false);
  }

  // Удаленные части кода для отправки запроса к ChatGPT
  async function handleClick() {
    const [isCrosswordGeneratedSuccesfully, wordsDirection] = crossgen(
      1,
      words
    );
    if (!isCrosswordGeneratedSuccesfully) {
      setError(true);
      setErrorMessage("With these words we can't make a crossword!");
      return;
    }

    if (wordsArray.length > 15) {
      setError(true);
      setErrorMessage("You can insert only 15 words!");
      return;
    }

    if (wordsArray.length < 3) {
      setError(true);
      setErrorMessage("You must insert at least 3 words!");
      return;
    }

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
      {error && (
        <ModalMessage
          messageType="error"
          message={
            error
              ? errorMessage
              : "Oops! Something went wrong. Please regenerate your crossword or contact us by emailing example@gmail.com."
          }
          closeModal={closeModal}
        />
      )}
      <div className="crossgen">
        <div className="form">
          <div className={styles.words}>
            <InputTag setWords={setWords} />{" "}
            {/* <p className={`${styles.text} bodyS bodySMedium`}>
              *The first word you insert becomes the main theme of your
              crossword puzzle.
            </p> */}
          </div>
          <div className={styles.controls}>
            <button
              onClick={handleClick}
              className={`${styles.button} bodyL bodyLBold`}
              style={style}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
