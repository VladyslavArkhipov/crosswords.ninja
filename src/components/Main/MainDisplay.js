import { useState } from "react";
import Title from "./Title";
import Header from "./Header";
import { useSelector } from "react-redux";

export default function MainDisplay() {
  async function fetchData() {
    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        someData: true,
      }),
    });
    console.log("RESPONSE", response);
  }

  const isCrosswordHidden = useSelector((state) => state.isCrosswordHidden);
  console.log(isCrosswordHidden);

  return (
    <>
      {isCrosswordHidden && (
        <>
          <Header />
          {/* Зона теста чатаГПТ */}
          <h1>TEXT</h1>
          <button onClick={fetchData}>Click me</button>
          {/* Зона теста чатаГПТ */}
          <Title />
        </>
      )}
    </>
  );
}
