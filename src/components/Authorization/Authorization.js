import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LoginForm from "@/components/Authorization/LoginForm";
import styles from "./Authorization.module.css"; // Импортируйте CSS-модуль
import Registration from "./Registration";

const Authorization = ({ setIsAuthorizationVisible }) => {
  const modalRef = useRef(null);

  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsAuthorizationVisible(false);
      setIsRegistrationVisible(true);
    }
  };

  const handleClickRegistration = () => {
    setIsRegistrationVisible(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer} ref={modalRef}>
        {!isRegistrationVisible && (
          <>
            <h1 className={styles.modalHeader}>Sign In</h1>
            <p className={styles.modalText}>
              To unlock all the features please Sign In
            </p>
            <LoginForm />

            <p className={styles.modalText}>
              Don't you have an account?
              <button
                onClick={handleClickRegistration}
                className={styles.link_button}
              >
                Register
              </button>
            </p>
          </>
        )}
        {isRegistrationVisible && (
          <Registration
            setIsRegistrationVisible={setIsRegistrationVisible}
          ></Registration>
        )}
      </div>
    </div>
  );
};

export default Authorization;
