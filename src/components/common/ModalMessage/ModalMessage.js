"use client";
import Close from "@/assets/Close";
import styles from "./ModalMessage.module.css"; // Импортируйте CSS-модуль
import SuccessIcon from "@/assets/SuccessIcon";
import InfoIcon from "@/assets/InfoIcon";
import ErrorIcon from "@/assets/ErrorIcon";

export default function ModalMessage(props) {
  function closeModal() {
    props.closeModal();
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.wrapper} ${
          props.messageType === "info"
            ? styles.info
            : props.messageType === "error"
            ? styles.error
            : props.messageType === "success"
            ? styles.success
            : ""
        }`}
      >
        {props.messageType === "info" ? (
          <div className={styles.icon}>
            <InfoIcon />
          </div>
        ) : props.messageType === "error" ? (
          <div className={styles.icon}>
            <ErrorIcon />
          </div>
        ) : props.messageType === "success" ? (
          <div className={styles.icon}>
            <SuccessIcon />
          </div>
        ) : (
          <></>
        )}
        <p className={`${styles.text} bodyM bodyMSemiBold`}>{props.message}</p>
        <button className={styles.close} onClick={closeModal}>
          <Close messageType={props.messageType} />
        </button>
      </div>
    </div>
  );
}
