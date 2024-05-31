"use client";
import CrosswordDisplay from "../components/CrosswordDisplay";
import MainDisplay from "../components/Main/MainDisplay";
import { Provider, useSelector } from "react-redux"; // изменения здесь
import { store } from "../store/store";
import { useEffect } from "react";

export default function Home() {
  return (
    <Provider store={store}>
      <MainDisplay></MainDisplay>
      <CrosswordDisplay></CrosswordDisplay>
    </Provider>
  );
}
