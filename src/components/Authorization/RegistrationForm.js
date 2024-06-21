"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./Authorization.module.css"; // Импортируйте CSS-модуль

import SocialLogins from "./SocialLogins";
import ShowPass from "@/assets/ShowPass";
import HidePass from "@/assets/HidePass";
import Success from "@/assets/Success";
import Close from "@/assets/Close";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setIsUserRegistered(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      console.log("now i will make fetch to db");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
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
    // Фокусируем на форме после регистрации для удобства ввода новых данных
    if (isUserRegistered && formRef.current) {
      formRef.current.reset(); // Очистка полей формы
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

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="my-2">
          <input
            className={styles.loginInput}
            type="text"
            name="name"
            id="name"
            placeholder="Enter the name"
          />
        </div>
        <div className="my-2">
          <input
            className={styles.loginInput}
            type="email"
            name="email"
            id="email"
            placeholder="Enter the email"
          />
        </div>

        <div className={styles.password_registration_container}>
          <input
            className={styles.loginInput}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter the password"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className={styles.show_password_button}
          >
            {showPassword ? <HidePass /> : <ShowPass />}
          </button>
        </div>

        <button type="submit" className={styles.submit_button}>
          {isLoading ? "Loading..." : "Continue"}
        </button>
      </form>
      <SocialLogins />
    </>
  );
};

export default RegistrationForm;
