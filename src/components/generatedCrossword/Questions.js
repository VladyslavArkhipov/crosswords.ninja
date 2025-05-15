import styles from "./GeneratedCrosswordContent.module.css";
import ArrowRight from "@/assets/ArrowRight";
import ArrowDown from "@/assets/ArrowDown";
import { crossgen } from "@/utils/crossgen";
import { useEffect, useState } from "react";
import Loading from "../common/Loading/Loading";

export default function Questions(props) {
  const [horizontalArray, setHorizontalArray] = useState([]);
  const [verticalArray, setVerticalArray] = useState([]);

  useEffect(() => {
    if (props.words.length) {
      const [isCrosswordGeneratedSuccesfully, wordsDirection] = crossgen(
        1,
        props.words
      );
      const fetchChatGPTResponse = async () => {
        try {
          const chatgptString = `Слова по горизонтали: ${wordsDirection[0]}. Слова по вертикали: ${wordsDirection[1]}.`;
          const chatGptResponse = await fetch("/api/chatgpt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ chatgptString }),
          });

          if (chatGptResponse.ok) {
            const chatGptData = await chatGptResponse.json();

            const [_, horizontalQuestions, verticalQuestions] =
              chatGptData.answer.split(/Across:|Down:/);

            const extractQuestions = (questionsString) => {
              return questionsString
                .trim()
                .split(/(?=\d\.\s)/) 
                .map((q) => q.trim()) 
                .filter((q) => q); 
            };

            setHorizontalArray(extractQuestions(horizontalQuestions));
            setVerticalArray(extractQuestions(verticalQuestions));
          } else {
            console.error("Error requesting chatgpt");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchChatGPTResponse();
    }
  }, [props.words]);

  return (
    <div className={styles.questions_wrapper}>
      {horizontalArray.length < 1 && verticalArray.length < 1 ? (
        <Loading />
      ) : (
        <></>
      )}
      <div className={styles.questions}>
        <div className={styles.questions_header}>
          <h2 className="bodyL bodyLSemiBold">Across</h2>
          <ArrowRight />
        </div>
        <ul>
          {horizontalArray.map((question, index) => (
            <li className={`${styles.question} bodyS bodySRegular`} key={index}>
              {question}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.questions}>
        <div className={styles.questions_header}>
          <h2>Down</h2>
          <ArrowDown />
        </div>
        <ul>
          {verticalArray.map((question, index) => (
            <li className={`${styles.question} bodyS bodySRegular`} key={index}>
              {question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
