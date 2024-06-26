"use client";
import { crossgen } from "@/utils/crossgen";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../Main/Header";
import Footer from "../Main/Footer";
import styles from "./Content.module.css";

export default function Content(props) {
  const params = useSearchParams();
  const [words, setWords] = useState(null);

  useEffect(() => {
    const wordsParam = params.get("words");
    if (wordsParam) {
      setWords(wordsParam);
    }
  }, [params]);

  if (words) crossgen(1, words);
  return (
    <>
      <Header isCrosswordGenerated={true} user={props.user} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.crossword_wrapper}>
            <div className="result"></div>
          </div>
          <div>
            <h1>Here will be questions</h1>
          </div>
        </div>
        <Footer isCrosswordGenerated={true} />
      </div>
    </>
  );
}
