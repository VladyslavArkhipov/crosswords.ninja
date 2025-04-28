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
          {!props.isCrosswordGenerated ? (
            <Link href="/">
              <Logo />
            </Link>
          ) : (
            <BackButton />
          )}
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
            <div className={styles.freeVersionContainer}>
              <p className={`${styles.freeVersionText} bodyL bodyLBold`}>
              You are using the free version
              </p>
            <button
              className={`${styles.headerButton}  btn btnAdditional`}
              onClick={() => setIsAuthorizationVisible(true)}
            >
              <span className={`${styles.signInText} bodyL bodyLExtraBold`}>
                Sign in
              </span>
              <span className={styles.headerButtonIcon}>
                <Login />
              </span>
            </button></div>
            
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
