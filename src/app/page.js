"use client";
import CrosswordDisplay from "../components/CrosswordDisplay";
import MainDisplay from "../components/Main/MainDisplay";
import { Provider } from "react-redux"; // изменения здесь
import { store } from "../store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <MainDisplay></MainDisplay>
      <CrosswordDisplay></CrosswordDisplay>
    </Provider>
  );
}
