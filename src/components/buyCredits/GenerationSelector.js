"use client";
import { useState } from "react";
import styles from "./BuyCreditsContent.module.css";
import ActiveOption from "@/assets/ActiveOption";
import PassiveOption from "@/assets/PassiveOption";

const GenerationSelector = (props) => {
  const [selectedOption, setSelectedOption] = useState(10);

  const options = [
    { generations: 5, price: 2 },
    { generations: 10, price: 3 },
    { generations: 15, price: 4 },
  ];

  return (
    <div className={styles.selectorWrapper}>
      {options.map((option) => (
        <label
          key={option.generations}
          className={`${styles.option} bodyL bodyLRegular ${
            selectedOption === option.generations ? styles.selected : ""
          }`}
        >
          <div className={styles.icon}>
            {selectedOption === option.generations ? (
              <ActiveOption />
            ) : (
              <PassiveOption />
            )}
          </div>
          <div className={styles.info}>
            <div className={styles.generationsWrapper}>
              <input
                type="radio"
                name="generation"
                value={option.generations}
                checked={selectedOption === option.generations}
                onChange={() => {
                  setSelectedOption(option.generations);
                  props.setChoosedGenerations(option);
                }}
              />
              {option.generations} generations
              {option.generations === 10 && (
                <div className={`${styles.mostPopular} bodyXS bodyXSMedium`}>
                  Most popular
                </div>
              )}
            </div>
            <div className={styles.price}>{option.price}$</div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default GenerationSelector;
