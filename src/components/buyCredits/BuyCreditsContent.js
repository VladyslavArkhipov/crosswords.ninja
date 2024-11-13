"use client";
import Link from "next/link";
import MainDisplay from "../MainDisplay/MainDisplay";
import styles from "./BuyCreditsContent.module.css";
import GenerationSelector from "./GenerationSelector";
import PaymentButton from "./PaymentButton ";
import { useState } from "react";
import Close from "@/assets/Close";

export default function BuyCreditsContent(props) {
  const [choosedGenerations, setChoosedGenerations] = useState({
    generations: 10,
    price: 0.2,
  });
  console.log(props);
  return (
    <>
      <MainDisplay user={props.user} />
      <div className={styles.modalBackground}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Credits Required</h2>
          <p className={`${styles.subheading} bodyL bodyLRegular`}>
            To proceed with crossword generation, credits are required. Please
            purchase generations to continue.
          </p>
          <GenerationSelector setChoosedGenerations={setChoosedGenerations} />
          <p className={`${styles.hidden_text} bodyS bodySRegular`}>
            Select your preferred amount to proceed with the purchase.
          </p>
          <p className={`${styles.special_info} bodyS bodySMedium`}>
            *A percentage of top-ups will go to the Armed Forces of Ukraine.
          </p>
          <div className={styles.buttons}>
            <Link
              href="/"
              className={`${styles.button} ${styles.cancel} bodyL bodyLBold`}
            >
              Cancel
            </Link>
            <PaymentButton
              className={styles.button}
              choosedGenerations={choosedGenerations}
              user={props.user}
            />
          </div>
          <button className={styles.closeModal}>
            <Link href="/">
              <Close color="black" />
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
