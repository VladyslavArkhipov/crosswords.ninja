import { crossgen } from "../../utils/crossgen";
import createPDF from "../../utils/createPDF";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Form.module.css"; // Импортируйте CSS-модуль

export default function Form() {
  const [words, setWords] = useState("");

  function handleChange(event) {
    setWords(event.target.value);
  }

  const dispatch = useDispatch();
  const isCrosswordHidden = useSelector((state) => state.isCrosswordHidden);
  const showCrossword = () => {
    dispatch({ type: "SHOW_CROSSWORD", payload: false });
  };

  function handleClick() {
    crossgen(1, words);
    //createPDF(); //загрузить пдф
    console.log("Button clicked");
    setWords("");
    showCrossword();
    console.log(isCrosswordHidden);
  }

  return (
    <div className="content">
      <div className="crossgen">
        <div className="form">
          <div className={styles.words}>
            <div className={styles.inputWrapper}>
              <textarea
                className={styles.textarrea}
                type="text"
                placeholder="Insert words to generate crossword (max. 15)"
                onChange={handleChange}
                value={words}
              ></textarea>
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
