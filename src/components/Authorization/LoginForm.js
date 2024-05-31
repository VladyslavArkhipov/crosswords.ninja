"use client";
import styles from "./Authorization.module.css"; // Импортируйте CSS-модуль
import SocialLogins from "./SocialLogins";

import { doCredentialLogin } from "@/app/actions";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <>
      <div className="">{error}</div>
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
          />
        </div>

        <div>
          <input
            className={styles.loginInput}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          Continue
        </button>
      </form>
    </>
  );
};

export default LoginForm;
