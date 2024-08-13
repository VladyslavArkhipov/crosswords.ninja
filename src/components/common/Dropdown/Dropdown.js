import React, { useState } from "react";
import styles from "./Dropdown.module.css"; // Импортируйте CSS-модуль
import Toggler from "@/assets/Toggler";
import Logout from "@/components/Authorization/Logout";
import Link from "next/link";
import Cash from "@/assets/Cash";
import SignOut from "@/assets/SignOut";
import Up from "@/assets/Up";
import Down from "@/assets/Down";
import BurgerMenu from "@/assets/BurgerMenu";
import Close from "@/assets/Close";
import Star from "@/assets/Star";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (option === "buy") {
      // Handle buy credits action
      console.log("Buy credits");
    } else if (option === "signout") {
      // Handle sign out action
      console.log("Sign out");
    }
  };

  return (
    <>
      <div className={styles.dropdown}>
        <div
          className={`${styles.dropdownToggle} ${
            isOpen && styles.dropdownToggleOpened
          }`}
          onClick={toggleMenu}
        >
          <p className={`${styles.email} bodyL bodyLExtraBold`}>
            {props.email}
          </p>
          {isOpen ? (
            <>
              <div className={styles.dropdownToggleIcon}>
                <Up />
              </div>
              <div className={styles.dropdownToggleIconMobile}>
                <Close messageType="none" />
              </div>
            </>
          ) : (
            <>
              <div className={styles.dropdownToggleIcon}>
                <Down />
              </div>
              <div className={styles.dropdownToggleIconMobile}>
                <BurgerMenu />
              </div>
            </>
          )}
        </div>
        {isOpen && (
          <div
            className={`${styles.dropdownMenu} ${styles.dropdownMenuDesktop}`}
          >
            <div
              className={styles.dropdownItem}
              onClick={() => handleOptionClick("buy")}
            >
              <Cash />
              <Link
                href="/buy_credits"
                className={`${styles.creditsLink} bodyL bodyLBold`}
              >
                Buy more credits
              </Link>
            </div>
            <div className={styles.dropdownItem}>
              <SignOut />
              <Logout onClick={() => handleOptionClick("signout")}></Logout>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className={`${styles.dropdownMenu} ${styles.dropdownMenuMobile}`}>
          <div className={styles.dropdownItem}>
            <Star />
            <p className={`${styles.creditsCountText} bodyL bodyLBold`}>
              {props.generations} credits left
            </p>
          </div>
          <div className={styles.dropdownItem}>
            <p className={`${styles.emailMobile} bodyL bodyLExtraBold`}>
              {props.email}
            </p>
          </div>
          <div
            className={`${styles.dropdownItem} ${styles.mobileButton} bodyL bodyLBold btn btnMobile`}
            onClick={() => handleOptionClick("buy")}
          >
            <Cash />
            <Link href="/buy_credits" className={`${styles.creditsLink} `}>
              Buy more credits
            </Link>
          </div>
          <div
            className={`${styles.dropdownItem}  ${styles.logoutButtonMobile}`}
          >
            <SignOut />
            <Logout onClick={() => handleOptionClick("signout")}></Logout>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
