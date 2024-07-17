"use client";
import { useState } from "react";
import styles from "./BuyCreditsContent.module.css";

const GenerationSelector = (props) => {
  const [selectedOption, setSelectedOption] = useState(10);

  const options = [
    { generations: 5, price: 2 },
    { generations: 10, price: 3 },
    { generations: 15, price: 4 },
  ];

  return (
    <div className={styles.wrapper}>
      {options.map((option) => (
        <label
          key={option.generations}
          className={`${styles.option} ${
            selectedOption === option.generations ? styles.selected : ""
          }`}
        >
          <div>
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
          </div>
          <div>
            {option.generations === 10 && (
              <span className={styles.mostPopular}>Most popular</span>
            )}
            {option.price}$
          </div>
        </label>
      ))}
    </div>
  );
};

export default GenerationSelector;
