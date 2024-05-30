import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
export default function CrosswordDisplay() {
  const dispatch = useDispatch();
  const isCrosswordHidden = useSelector((state) => state.isCrosswordHidden);
  const hideCrossword = () => {
    dispatch({ type: "HIDE_CROSSWORD", payload: false });
  };
  return (
    <>
      <Header></Header>
      <div className="main-container">
        <div className="result"></div>;
      </div>
    </>
  );
}
