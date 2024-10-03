import { useState } from "react";
import Link from "next/link";
import styles from "./BackButtons.module.css";
import Back from "@/assets/Back";
import Close from "@/assets/Close";

export default function BackButton() {
  // Управление состоянием модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Открыть модальное окно
  const openModal = () => setIsModalOpen(true);

  // Закрыть модальное окно
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={styles.container} onClick={openModal}>
        <div className={styles.wrapper}>
          <div className={styles.col}>
            <Back />
          </div>
          <div className={styles.col}>
            <p>Back</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={closeModal}>
              <Close color="black" />
            </button>
            <div className={styles.textWrapper}>
              <h2>Are you sure you want to sign out?</h2>
              <p className={`${styles.modalText} bodyL bodyLRegular`}>
                To proceed with crossword generation, credits are required.
                Please purchase generations to continue.
              </p>
            </div>

            <div className={styles.buttonWrapper}>
              <button
                className="btn btnSecondary bodyL bodyLBold"
                onClick={closeModal}
              >
                Cancel
              </button>
              <Link href="/">
                <button className="btn btnPrimary bodyL bodyLBold">
                  Go back
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
