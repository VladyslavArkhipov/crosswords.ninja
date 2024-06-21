"use client";
import Title from "./Title";
import Header from "./Header";
import Footer from "./Footer";
import Logout from "../Authorization/Logout";

export default function MainDisplay(props) {
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

  return (
    <>
      <>
        <Header user={props.user} />
        {/* Зона теста чатаГПТ */}
        <h1>TEXT</h1>
        <button onClick={fetchData}>Click me</button>
        {/* Зона теста чатаГПТ */}
        <Title />
        <Footer></Footer>
      </>
    </>
  );
}
