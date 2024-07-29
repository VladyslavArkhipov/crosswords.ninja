import Title from "./Title";
import Header from "./Header";
import Footer from "./Footer";

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
