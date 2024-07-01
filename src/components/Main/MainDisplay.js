"use client";
import { useState } from "react";

import Title from "./Title";
import Header from "./Header";
import Footer from "./Footer";
import PaymentButton from "./PaymentButton ";

export default function MainDisplay(props) {
  const [responseData, setResponseData] = useState(null);

  async function fetchData() {
    try {
      const question = "Сколько дней в году?";

      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const responseBody = await response.json();
      console.log("Response from server:", responseBody);
    } catch (error) {
      console.error("Error fetching ChatGPT:", error);
    }
  }

  // Вызываем функцию для отправки запроса
  fetchData();

  return (
    <>
      <>
        <Header user={props.user} />
        {/* Зона теста чатаГПТ */}
        <h1>TEXT</h1>
        <button onClick={fetchData}>Click me</button>
        {responseData && (
          <div>
            <h2>Response from ChatGPT:</h2>
            <p>{responseData}</p>
          </div>
        )}
        {/* Зона теста чатаГПТ */}

        {/* Зона теста оплаты */}
        <PaymentButton />
        {/* Зона теста оплаты */}
        <Title />
        <Footer></Footer>
      </>
    </>
  );
}
