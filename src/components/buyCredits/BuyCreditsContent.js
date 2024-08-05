"use client";
import Link from "next/link";
import MainDisplay from "../MainDisplay/MainDisplay";
import styles from "./BuyCreditsContent.module.css";
import GenerationSelector from "./GenerationSelector";
import PaymentButton from "./PaymentButton ";
import { useState } from "react";

export default function BuyCreditsContent(props) {
  const [choosedGenerations, setChoosedGenerations] = useState({
    generations: 10,
    price: 3,
  });
  return (
    <>
      <MainDisplay user={props.user} />
      <div className={styles.modalBackground}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Credits Required</h2>
          <p className={styles.subheading}>
            To proceed with crossword generation, credits are required. Please
            purchase generations to continue.
          </p>
          <GenerationSelector setChoosedGenerations={setChoosedGenerations} />
          <p className={styles.hidden_text}>
            Select your preferred amount to proceed with the purchase.
          </p>
          <p className={styles.special_info}>
            * A percentage of top-ups will go to the Armed Forces of Ukraine.
          </p>
          <div>
            <Link href="/">Cancel</Link>
            <PaymentButton choosedGenerations={choosedGenerations} />
          </div>
        </div>
      </div>
    </>
  );
}
