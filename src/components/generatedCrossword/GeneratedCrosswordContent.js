"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import styles from "./GeneratedCrosswordContent.module.css";

import DownloadPDFButton from "./DownloadPDFButton";
import Questions from "./Questions";

export default function GeneratedCrosswordContent(props) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const params = useSearchParams();
  const [words, setWords] = useState([]);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const dataParam = params.get("data");
    if (dataParam) {
      const parsedData = JSON.parse(decodeURIComponent(dataParam));
      setWords(parsedData.words);
    }
  }, [params]);

  return (
    <>
      <Header isCrosswordGenerated={true} user={props.user} />
      <div className={styles.container}>
        <div className={styles.wrapper} id="wrapper" ref={wrapperRef}>
          <div className={styles.crossword_wrapper}>
            <div className="result"></div>
          </div>
          <Questions words={words} />
          {!isButtonClicked ? (
            <div className={styles.pdfButtonWrapper} ref={buttonRef}>
              <DownloadPDFButton
                setIsButtonClicked={setIsButtonClicked}
                wrapperRef={wrapperRef}
                buttonRef={buttonRef}
              />
            </div>
          ) : null}
        </div>
        <Footer isCrosswordGenerated={true} />
      </div>
    </>
  );
}
