"use client";
import React, { useState } from "react";
import Logo from "../../../assets/Logo";
import Authorization from "../../Authorization/Authorization";
import styles from "./Header.module.css"; // Импортируйте CSS-модуль
import Link from "next/link";
import Star from "@/assets/Star";
import Dropdown from "../Dropdown/Dropdown";
import BackButton from "../Buttons/BackButton";

export default function Header(props) {
  const [isAuthorizationVisible, setIsAuthorizationVisible] = useState(false);

  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.headerCol}>
          {!props.isCrosswordGenerated ? <Logo /> : <BackButton />}
        </div>
        <div className="header_col">
          {props.user ? (
            <div className={styles.user_info_container}>
              <Star />
              <p
                className={`${styles.user_info_container_text} bodyL bodyLBold`}
              >
                {props.user.generations} credits left
              </p>
              <Dropdown email={props.user.email} />
            </div>
          ) : (
            <button
              className={`${styles.headerButton} bodyL bodyLBold`}
              onClick={() => setIsAuthorizationVisible(true)}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
      {isAuthorizationVisible && (
        <Authorization
          setIsAuthorizationVisible={setIsAuthorizationVisible}
        ></Authorization>
      )}
    </header>
  );
}
