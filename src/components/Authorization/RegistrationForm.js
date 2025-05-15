"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./Authorization.module.css";

import SocialLogins from "./SocialLogins";
import ShowPass from "@/assets/ShowPass";
import HidePass from "@/assets/HidePass";
import Success from "@/assets/Success";
import Close from "@/assets/Close";
import useValidation from "./useValidation";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const { errors, validate } = useValidation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setIsUserRegistered(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    if (!validate(formData)) {
      setIsLoading(false);
      return;
    }

    try {
      const email = formData.get("email");
      const password = formData.get("password");

      console.log("now i will make fetch to db");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 201) {
        setIsUserRegistered(true);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  useEffect(() => {
    if (isUserRegistered && formRef.current) {
      formRef.current.reset(); 
    }
  }, [isUserRegistered]);

  return (
    <>
      {isUserRegistered && (
        <div className={styles.registration_status_container}>
          <div className={styles.registration_status_wrapper}>
            <Success />
            <p>Registration is successful! Now you can sign in.</p>
            <div className={styles.close_modal} onClick={closeModal}>
              <Close />
            </div>
          </div>
        </div>
      )}

      <SocialLogins />
      <p className={`${styles.modalText} bodyM bodyMRegular`}>or</p>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="my-2">
          <input
            className={`${styles.loginInput} bodyM bodyMRegular`}
            type="email"
            name="email"
            id="email"
            placeholder="Enter the email"
          />
        </div>

        <div className={styles.passwordInputContainer}>
          <input
            className={`${styles.loginInput} bodyM bodyMRegular`}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter the password"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className={styles.showPasswordButton}
          >
            {showPassword ? <HidePass /> : <ShowPass />}
          </button>
        </div>

        <button
          type="submit"
          className={`${styles.submitButton} btn btnL btnPrimary bodyL bodyLBold`}
        >
          {isLoading ? "Loading..." : "Continue"}
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
