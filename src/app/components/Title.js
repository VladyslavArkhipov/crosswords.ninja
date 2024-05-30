"use client";

import Form from "./Form";

export default function Title() {
  return (
    <div className="title_container">
      <div className="title_wrapper">
        <>
          <h1>Make your crossword with AI Generator</h1>
          <h2>
            Use words in any language. Simply insert the words, press generate
            and get crossword with clues.
          </h2>
        </>
        <Form></Form>
      </div>
    </div>
  );
}
