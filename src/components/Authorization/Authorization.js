import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LoginForm from "@/components/Authorization/LoginForm";
import styles from "./Authorization.module.css"; // Импортируйте CSS-модуль
import Registration from "./Registration";
import Close from "@/assets/Close";

const Authorization = ({ setIsAuthorizationVisible }) => {
  const modalRef = useRef(null);

  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsAuthorizationVisible(false);
      setIsRegistrationVisible(true);
    }
  };

  const handleClick = () => {
    setIsAuthorizationVisible(false);
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
            <h2 className={styles.modalHeader}>Sign In</h2>
            <p className={`${styles.subheading} bodyL bodyLRegular`}>
              To unlock all the features please sign in.
            </p>
            <LoginForm />

            <p className={`${styles.modalText} bodyM bodyMRegular`}>
              Don't you have an account?
              <button
                onClick={handleClickRegistration}
                className={`${styles.linkButton} bodyM bodyMRegular`}
              >
                Sign up.
              </button>
            </p>
          </>
        )}
        {isRegistrationVisible && (
          <Registration
            setIsRegistrationVisible={setIsRegistrationVisible}
          ></Registration>
        )}
        <button onClick={handleClick} className={styles.closeModal}>
          <Close />
        </button>
      </div>
    </div>
  );
};

export default Authorization;
