"use client";
import Title from "./Title";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import Loading from "../common/Loading/Loading";
import styles from "./MainDisplay.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainDisplay(props) {
  const router = useRouter();
  const { searchParams } = router;

  const message = searchParams?.get("message");

  useEffect(() => {
    if (message) {
      console.log("Payment Status:", message);
    }
  }, [message]);

  return (
    <div className={styles.mainDisplay}>
      <Header user={props.user} />
      <Title />
      <Footer />
    </div>
  );
}
