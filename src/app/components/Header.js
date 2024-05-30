import React from "react";
import Logo from "../assets/Logo";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const isCrosswordHidden = useSelector((state) => state.isCrosswordHidden);

  return (
    <header>
      <div className="header_wrapper">
        <div className="header_col">
          {isCrosswordHidden ? <Logo /> : <button>Back</button>}
        </div>
        <div className="header_col">
          <div className="header_button">
            <button>Sign in</button>
          </div>
        </div>
      </div>
    </header>
  );
}
