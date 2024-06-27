"use client";
import { crossgen } from "@/utils/crossgen";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Header from "../Main/Header";
import Footer from "../Main/Footer";
import styles from "./Content.module.css";
import Download from "@/assets/Download";
import ArrowRight from "@/assets/ArrowRight";
import ArrowDown from "@/assets/ArrowDown";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Content(props) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const params = useSearchParams();
  const [words, setWords] = useState(null);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const wordsParam = params.get("words");
    if (wordsParam) {
      setWords(wordsParam);
    }
  }, [params]);

  useEffect(() => {
    if (words) {
      crossgen(1, words);
    }
  }, [words]);

  const downloadPDF = () => {
    setIsButtonClicked(true);
    const input = wrapperRef.current;
    const button = buttonRef.current;

    // Скрыть кнопку перед созданием PDF
    if (button) button.style.display = "none";

    // Сохранить текущие стили
    const originalStyles = {
      wrapperPadding: input.style.padding,
      crosswordWrapperPadding: input.querySelector(
        `.${styles.crossword_wrapper}`
      ).style.padding,
      questionsWrapperPadding: input.querySelector(
        `.${styles.questions_wrapper}`
      ).style.padding,
    };

    //изменения размера ячеек кроссворда
    const cells = input.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.style.width = `44px`;
      cell.style.height = `44px`;
    });

    // Применить стили для печати
    input.style.padding = "100px";

    // Увеличить размер шрифта всех элементов внутри wrapper в 2 раза
    const originalFontSizes = [];
    const elements = input.querySelectorAll("*");
    elements.forEach((element, index) => {
      const style = window.getComputedStyle(element);
      originalFontSizes[index] = style.fontSize;
      element.style.fontSize = `calc(${style.fontSize} * 2)`;
    });

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.5); // Используем JPEG формат и сжатие
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("crossword.pdf");

        // Вернуть исходные стили
        input.style.padding = originalStyles.wrapperPadding;
        input.querySelector(`.${styles.crossword_wrapper}`).style.padding =
          originalStyles.crosswordWrapperPadding;
        input.querySelector(`.${styles.questions_wrapper}`).style.padding =
          originalStyles.questionsWrapperPadding;

        // Вернуть исходные размеры шрифта
        elements.forEach((element, index) => {
          element.style.fontSize = originalFontSizes[index];
        });

        cells.forEach((cell, index) => {
          cell.style.width = "22px";
          cell.style.height = "22px";
        });

        // Показать кнопку снова после генерации PDF
        if (button) button.style.display = "block";
        setIsButtonClicked(false);
      })
      .catch((error) => {
        console.error("Ошибка при создании PDF:", error);
        setIsButtonClicked(false);
      });
  };

  return (
    <>
      <Header isCrosswordGenerated={true} user={props.user} />
      <div className={styles.container}>
        <div className={styles.wrapper} id="wrapper" ref={wrapperRef}>
          <div className={styles.crossword_wrapper}>
            <div className="result"></div>
          </div>
          <div className={styles.questions_wrapper}>
            <div className={styles.questions}>
              <div className={styles.questions_header}>
                <h2>Across</h2>
                <ArrowRight />
              </div>
            </div>
            <div className={styles.questions}>
              <div className={styles.questions_header}>
                <h2>Down</h2>
                <ArrowDown />
              </div>
            </div>
          </div>
          {!isButtonClicked ? (
            <div className={styles.pdf_wrapper} ref={buttonRef}>
              <button
                type="button"
                className={styles.button}
                onClick={downloadPDF}
              >
                <Download />
              </button>
            </div>
          ) : null}
        </div>
        <Footer isCrosswordGenerated={true} />
      </div>
    </>
  );
}
