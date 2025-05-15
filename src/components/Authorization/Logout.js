import { doLogout } from "@/app/actions";
import styles from "./Authorization.module.css"; 

const Logout = () => {
  return (
    <form action={doLogout}>
      <button className={`${styles.logout} bodyL bodyLBold`} type="submit">
        Log out
      </button>
    </form>
  );
};

export default Logout;
