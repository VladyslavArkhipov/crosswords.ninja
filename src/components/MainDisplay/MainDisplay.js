import Title from "./Title";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import styles from "./MainDisplay.module.css";

export default function MainDisplay(props) {
  return (
    <div className={styles.mainDisplay}>
      <Header user={props.user} />
      <Title user={props.user} />
      <Footer />
    </div>
  );
}
