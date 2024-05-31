"use client";
import React, { useState } from "react";
import Logo from "../../assets/Logo";
import { useDispatch, useSelector } from "react-redux";
import Authorization from "../Authorization/Authorization";
import styles from "./Header.module.css"; // Импортируйте CSS-модуль

export default function Header() {
  const isCrosswordHidden = useSelector((state) => state.isCrosswordHidden);
  const [isAuthorizationVisible, setIsAuthorizationVisible] = useState(false);

  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.headerCol}>
          {isCrosswordHidden ? <Logo /> : <button>Back</button>}
        </div>
        <div className="header_col">
          <button
            className={styles.headerButton}
            onClick={() => setIsAuthorizationVisible(true)}
          >
            Sign in
          </button>
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
