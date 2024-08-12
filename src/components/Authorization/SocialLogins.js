import { doSocialLogin } from "@/app/actions";
import styles from "./Authorization.module.css";
import Google from "@/assets/Google";
const SocialLogins = () => {
  return (
    <form action={doSocialLogin}>
      <button
        className={`${styles.googleButton} btn btnL btnSecondary bodyL bodyLBold`}
        type="submit"
        name="action"
        value="google"
      >
        <Google />
        <span className={styles.googleButtonText}>Continue with Google</span>
      </button>
    </form>
  );
};

export default SocialLogins;
