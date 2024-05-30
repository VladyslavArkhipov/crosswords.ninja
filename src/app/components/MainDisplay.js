import Title from "./Title";
import Header from "./Header";
import { useSelector } from "react-redux";

export default function MainDisplay() {
  const isCrosswordHidden = useSelector((state) => state.isCrosswordHidden);
  console.log(isCrosswordHidden);
  return (
    <>
      {isCrosswordHidden && (
        <>
          <Header></Header>
          <Title></Title>
        </>
      )}
    </>
  );
}
