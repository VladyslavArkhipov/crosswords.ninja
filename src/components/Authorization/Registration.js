import RegistrationForm from "./RegistrationForm";
import styles from "./Authorization.module.css"; 
import Close from "@/assets/Close";

export default function Registration({ setIsRegistrationVisible }) {
  const handleClick = () => {
    setIsRegistrationVisible(false);
  };
  return (
    <>
      <h2 className={styles.modalHeader}>Sign Up</h2>
      <p className={`${styles.subheading} bodyL bodyLRegular`}>
        To unlock all the features please sign in.
      </p>
      <RegistrationForm />
      <p className={`${styles.modalText} bodyM bodyMRegular`}>
        Already have an account?
        <button
          onClick={handleClick}
          className={`${styles.linkButton} bodyM bodyMRegular`}
        >
          Sign in.
        </button>
      </p>
    </>
  );
}
