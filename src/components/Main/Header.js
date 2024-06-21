"use client";
import React, { useState } from "react";
import Logo from "../../assets/Logo";
import Authorization from "../Authorization/Authorization";
import styles from "./Header.module.css"; // Импортируйте CSS-модуль
import Link from "next/link";
import CurrentUser from "./CurrentUser";
import Star from "@/assets/Star";
import Dropdown from "../common/Dropdown/Dropdown";

export default function Header(props) {
  const [isAuthorizationVisible, setIsAuthorizationVisible] = useState(false);

  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.headerCol}>
          <Logo />
        </div>
        <div className="header_col">{/* <CurrentUser></CurrentUser> */}</div>
        <div className="header_col">
          {props.user ? (
            <div className={styles.user_info_container}>
              <Star />
              <p className={styles.user_info_container_text}>
                {props.user.generations} credits left
              </p>
              {/* <p>{props.user.email}</p> */}
              <Dropdown email={props.user.email} />
            </div>
          ) : (
            <button
              className={styles.headerButton}
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
