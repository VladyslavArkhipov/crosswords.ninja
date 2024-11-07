// useValidation.js
import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const newErrors = {};

    const email = formData.get("email");
    const password = formData.get("password");

    // Валидация email
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    // Валидация password
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Возвращаем true, если нет ошибок
  };

  return { errors, validate };
};

export default useValidation;
