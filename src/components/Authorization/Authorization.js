import React, { useEffect, useRef } from "react";
import Link from "next/link";
import LoginForm from "@/components/Authorization/LoginForm";
import styles from "./Authorization.module.css"; // Импортируйте CSS-модуль

const Authorization = ({ setIsAuthorizationVisible }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsAuthorizationVisible(false);
    }
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
        <h1 className={styles.modalHeader}>Sign In</h1>
        <p className={styles.modalText}>
          To unlock all the features please Sign In
        </p>
        <LoginForm />
        <p className="my-3">
          Don't you have an account?
          <Link href="register" className="mx-2 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Authorization;
