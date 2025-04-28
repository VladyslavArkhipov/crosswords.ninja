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
  let watermarkStyle;
  if (props.user !== null && props.user.generations !== 0) {
    watermarkStyle = styles.noWatermarkBG;
  } else {
    watermarkStyle = styles.watermarkBG;
  }

  useEffect(() => {
    const dataParam = params.get("data");
    if (dataParam) {
      const parsedData = JSON.parse(decodeURIComponent(dataParam));
      setWords(parsedData.words);
    }
  }, [params]);

  return (
    <>
      <div className={styles.container}>
        <Header isCrosswordGenerated={true} user={props.user} />
        <div className={styles.wrapper} id="wrapper" ref={wrapperRef}>
        {(props.user === null || props.user.generations === 0) && (
  <div className={styles.guestNotice}>
    <h2>
      This is the free version.
    </h2>
    <p className="body bodyL bodyLRegular"> You cannot download the crossword or view it without a watermark. For full access, <span className="body bodyL bodyLBold">Sign in</span> and top up your balance.</p>
  </div>
)}
          <div className={`${styles.crossword_wrapper} ${watermarkStyle} `}>
            <div className="result"></div>
          </div>
          <Questions words={words} />
          {!isButtonClicked ? (
            <div className={styles.pdfButtonWrapper} ref={buttonRef}>
              <DownloadPDFButton
                setIsButtonClicked={setIsButtonClicked}
                wrapperRef={wrapperRef}
                buttonRef={buttonRef}
                user={props.user}
              />
            </div>
          ) : null}
        </div>
        <Footer isCrosswordGenerated={true} />
      </div>
    </>
  );
}
