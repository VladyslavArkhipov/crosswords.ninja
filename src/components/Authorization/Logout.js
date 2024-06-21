import { doLogout } from "@/app/actions";
import styles from "./Authorization.module.css"; // Импортируйте CSS-модуль

const Logout = () => {
  return (
    <form action={doLogout}>
      <button className={styles.logout} type="submit">
        Logout
      </button>
    </form>
  );
};

export default Logout;
