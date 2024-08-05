import React, { useState } from "react";
import styles from "./Dropdown.module.css"; // Импортируйте CSS-модуль
import Toggler from "@/assets/Toggler";
import Logout from "@/components/Authorization/Logout";
import Link from "next/link";

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
    <div className={styles.dropdown}>
      <div className={styles.dropdown_toggle} onClick={toggleMenu}>
        <p className={`${styles.email} bodyL bodyLExtraBold`}>{props.email}</p>
        <Toggler />
      </div>
      {isOpen && (
        <div className={styles.dropdown_menu}>
          <div
            className={styles.dropdown_item}
            onClick={() => handleOptionClick("buy")}
          >
            <Link href="/buy_credits">Buy credits</Link>
          </div>
          <div className={styles.dropdown_item}>
            <Logout onClick={() => handleOptionClick("signout")}></Logout>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
