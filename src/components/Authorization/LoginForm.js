"use client";
import styles from "./Authorization.module.css"; // Импортируйте CSS-модуль
import SocialLogins from "./SocialLogins";

import { doCredentialLogin } from "@/app/actions";

import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        window.location.reload(); // Перезагрузить страницу
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <SocialLogins />
      <p className={styles.modalText}>or</p>
      <form onSubmit={onSubmit}>
        <div>
          <input
            className={styles.loginInput}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <input
            className={styles.loginInput}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submit_button}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Continue"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
