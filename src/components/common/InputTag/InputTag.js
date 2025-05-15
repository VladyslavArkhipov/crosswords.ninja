import React, { useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import styles from "./InputTag.module.css"; 
import "./InputTag.css";

const KeyCodes = {
  enter: 13,
};

const delimiters = [KeyCodes.enter];

const InputTag = ({ setWords }) => {
  const [tags, setTags] = React.useState([]);

  useEffect(() => {
    setWords(tags.map((tag) => tag.text).join(" "));
  }, [tags, setWords]);

  const handleDelete = (i) => {
    setTags((prevTags) => prevTags.filter((tag, index) => index !== i));
  };

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
