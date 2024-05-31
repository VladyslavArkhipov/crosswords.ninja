import { doSocialLogin } from "@/app/actions";
import styles from "./Authorization.module.css";
import Google from "@/assets/Google";
const SocialLogins = () => {
  return (
    <form action={doSocialLogin}>
      <button
        className={styles.googleButton}
        type="submit"
        name="action"
        value="google"
      >
        <div className={styles.googleImage}>
          <Google />
        </div>
        Continue with Google
      </button>
    </form>
  );
};

export default SocialLogins;
