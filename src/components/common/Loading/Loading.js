"use client";
import { ClipLoader } from "react-spinners";
import styles from "./Loading.module.css";

export default function Loading(props) {
  const override = {
    margin: "0 auto",
  };

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingWrapper}>
        <h2 className={styles.header}>Generating your crossword</h2>
        <p className={`${styles.text} bodyL bodyLRegular`}>
          This may take a few minutes...
        </p>
        <ClipLoader
          color={"black"}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
