import Title from "./Title";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import Loading from "../common/Loading/Loading";

export default function MainDisplay(props) {
  return (
    <>
      <>
        <Header user={props.user} />
        <Title />
        <Footer />
      </>
    </>
  );
}
