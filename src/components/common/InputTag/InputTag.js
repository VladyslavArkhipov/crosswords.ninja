import React, { useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import styles from "./InputTag.module.css"; // Импортируйте CSS-модуль
import "./InputTag.css";

// Specifies which characters should terminate tags input. An array of character codes.
const KeyCodes = {
  enter: 13,
};

const delimiters = [KeyCodes.enter];

const InputTag = ({ setWords }) => {
  const [tags, setTags] = React.useState([]);

  // Use useEffect to update the parent component's state
  useEffect(() => {
    setWords(tags.map((tag) => tag.text).join(" "));
  }, [tags, setWords]);

  // Method to delete tag from Array
  const handleDelete = (i) => {
    setTags((prevTags) => prevTags.filter((tag, index) => index !== i));
  };

  // Method to Add tag into Array
  const handleAddition = (tag) => {
    if (tags.length < 15) {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  return (
    <div className={styles.textarreaWrapper}>
      <div id="tags">
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="bottom"
          autocomplete
          allowDragDrop={false}
          placeholder="Insert words to generate crossword (max. 15)"
          autoАocus={false}
        />
      </div>
    </div>
  );
};

export default InputTag;
