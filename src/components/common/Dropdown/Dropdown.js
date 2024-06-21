import React, { useState } from "react";
import styles from "./Dropdown.module.css"; // Импортируйте CSS-модуль
import Toggler from "@/assets/Toggler";
import Logout from "@/components/Authorization/Logout";

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
        <p className={styles.email}>{props.email}</p>
        <Toggler />
        {/* <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span> */}
      </div>
      {isOpen && (
        <div className={styles.dropdown_menu}>
          <div
            className={styles.dropdown_item}
            onClick={() => handleOptionClick("buy")}
          >
            Buy credits
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
