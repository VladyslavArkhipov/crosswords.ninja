import Link from "next/link";
import styles from "./BackButtons.module.css";
import Back from "@/assets/Back";
export default function BackButton() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.col}>
          <Back />
        </div>
        <div className={styles.col}>
          <p>Back</p>
        </div>
      </div>
    </div>
  );
}
