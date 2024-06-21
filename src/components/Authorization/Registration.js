import RegistrationForm from "./RegistrationForm";
import styles from "./Authorization.module.css"; // Импортируйте CSS-модуль

export default function Registration({ setIsRegistrationVisible }) {
  const handleClick = () => {
    setIsRegistrationVisible(false);
  };
  return (
    <>
      <h1 className={styles.modalHeader}>Registration</h1>
      <RegistrationForm />
      <p className={styles.modalText}>
        Already have an account?
        <button onClick={handleClick} className={styles.link_button}>
          Sign in
        </button>
      </p>
    </>
  );
}
