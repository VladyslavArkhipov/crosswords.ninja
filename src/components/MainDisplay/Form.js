"use client";
import { crossgen } from "../../utils/crossgen";
import React, { useState, useEffect } from "react";
import styles from "./Form.module.css"; // Импортируйте CSS-модуль
import { useRouter } from "next/navigation"; // Импортируем хук useRouter

import InputTag from "../common/InputTag/InputTag";
import ModalMessage from "../common/ModalMessage/ModalMessage";
import Loading from "../common/Loading/Loading";

export default function Form() {
  const [words, setWords] = useState("");
  const router = useRouter(); // Создаем экземпляр роутера
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [marginTop, setMarginTop] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const updateMarginTop = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setMarginTop(
        words.length > 90
          ? "280px"
          : words.length > 72
          ? "240px"
          : words.length > 54
          ? "190px"
          : words.length > 36
          ? "140px"
          : words.length > 18
          ? "90px"
          : words.length > 1
          ? "40px"
          : ""
      );
    } else {
      setMarginTop(
        words.length > 80
          ? "140px"
          : words.length > 40
          ? "92px"
          : words.length > 1
          ? "40px"
          : ""
      );
    }
  };

  useEffect(() => {
    updateMarginTop();
    window.addEventListener("resize", updateMarginTop);
    return () => {
      window.removeEventListener("resize", updateMarginTop);
    };
  }, [words]);

  const wordsArray = words.split(" ");

  function closeModal() {
    setError(false);
  }

  async function handleClick() {
    if (words.length === 0 || wordsArray.length < 3) {
      setError(true);
      setErrorMessage("You must insert at least 3 words!");
      return;
    }
    const [isCrosswordGeneratedSuccesfully, wordsDirection] = crossgen(
      1,
      words
    );
    if (!isCrosswordGeneratedSuccesfully) {
      setError(true);
      setErrorMessage("With these words we can't make a crossword!");
      return;
    }

    if (isCrosswordGeneratedSuccesfully) {
      try {
        const response = await fetch("/api/submitWords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ words }),
        });

        if (response.ok) {
          setIsButtonClicked(true);
          const data = await response.json();
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
      {isButtonClicked && <Loading />}
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
            <InputTag setWords={setWords} />
          </div>
          <div className={styles.controls}>
            <button
              onClick={handleClick}
              className={`${styles.button} bodyL bodyLBold btn btnL btnPrimary`}
              style={{ marginTop }}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
