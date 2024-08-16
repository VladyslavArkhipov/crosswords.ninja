"use client";
import React, { useState } from "react";
import Logo from "../../../assets/Logo";
import Authorization from "../../Authorization/Authorization";
import styles from "./Header.module.css";
import Link from "next/link";
import Star from "@/assets/Star";
import Dropdown from "../Dropdown/Dropdown";
import BackButton from "../Buttons/BackButton";
import Login from "@/assets/Login";

export default function Header(props) {
  const [isAuthorizationVisible, setIsAuthorizationVisible] = useState(false);

  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.logoContainer}>
          <Link href="/">
            {!props.isCrosswordGenerated ? <Logo /> : <BackButton />}
          </Link>
        </div>
        <div className={styles.userInfoWrapper}>
          {props.user ? (
            <>
              <div className={styles.userInfoContainer}>
                <Star />
                <p
                  className={`${styles.userInfoContainerText} bodyL bodyLBold`}
                >
                  {props.user.generations} credits left
                </p>
              </div>
              <Dropdown
                email={props.user.email}
                generations={props.user.generations}
              />
            </>
          ) : (
            <button
              className={`${styles.headerButton} bodyL bodyLBold btn btnAdditional`}
              onClick={() => setIsAuthorizationVisible(true)}
            >
              <span className={`${styles.signInText} bodyL bodyLBold`}>
                Sign in
              </span>
              <span className={styles.headerButtonIcon}>
                <Login />
              </span>
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
