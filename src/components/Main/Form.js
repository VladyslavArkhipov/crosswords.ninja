"use client";
import { crossgen } from "../../utils/crossgen";
import createPDF from "../../utils/createPDF";
import React, { useState } from "react";
import styles from "./Form.module.css"; // Импортируйте CSS-модуль
import { useRouter } from "next/navigation"; // Импортируем хук useRouter

import InputTag from "../common/InputTag/InputTag";

export default function Form() {
  const [words, setWords] = useState("");
  const router = useRouter(); // Создаем экземпляр роутера

  function handleChange(event) {
    setWords(event.target.value);
  }

  /* function handleClick() {
    //сценарий нажатия кнопки: моя строка уходит на сервер, из нее берутся слова и отправляются чату гпт для вопросов, снимается одна генерация, если все окей то моя строка возвращается от сервера и работает через функцию для генерации кроссворда, плюс возвращаются каким-то образом вопросы
    crossgen(1, words);
    //createPDF(); //загрузить пдф
    console.log("Button clicked");
  } */
  async function handleClick() {
    try {
      const response = await fetch("/api/submitWords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ words }),
      });

      if (response.ok) {
        const data = await response.json();
        // Переходим на страницу /generatedCrossword и передаем words как query параметр
        router.push(`/generatedCrossword?words=${encodeURIComponent(words)}`);
      } else {
        console.error("Error submitting words");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="content">
      <div className="crossgen">
        <div className="form">
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
        <div className="load_more hidden">
          <button className="control pdf">Загрузить в PDF</button>
        </div>
      </div>
    </div>
  );
}
