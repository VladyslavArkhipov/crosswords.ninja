import RegistrationForm from "./RegistrationForm";
import Link from "next/link";

export default function Registration({ setIsRegistrationVisible }) {
  const handleClick = () => {
    setIsRegistrationVisible(false);
  };
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <RegistrationForm />
      <p className="my-3">
        Already have an account?
        <button onClick={handleClick} className="mx-2 underline">
          Login
        </button>
      </p>
    </div>
  );
}
