import { useState, useEffect } from "react";

export default function Close(props) {
  const [color, setColor] = useState("rgba(39, 44, 37, 1)");

  useEffect(() => {
    if (props.messageType === "info") {
      setColor("rgba(39, 44, 37, 1)");
    } else if (props.messageType === "error") {
      setColor("rgba(119, 29, 29, 1)");
    } else if (props.messageType === "success") {
      setColor("rgba(1, 71, 55, 1)");
    }
  }, [props.messageType]);

  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_920_2197)">
        <path
          d="M18.5 6L6.5 18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 6L18.5 18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_920_2197">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
