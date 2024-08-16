"use client"; // Убедитесь, что это клиентский компонент

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentResult() {
  const router = useRouter();
  const query = router.query || {};
  const { status, orderReference, amount } = query;

  useEffect(() => {
    if (status) {
      if (status === "Approved") {
        // Перенаправление на главную страницу
        router.push("/");
      } else {
        // Логика для неуспешных платежей или обработка ошибок
        console.log("Payment failed or pending");
      }
    }
  }, [status, router]);

  return (
    <div>
      <h1>Processing payment...</h1>
      {/* Можно добавить сообщение или лоадер здесь */}
    </div>
  );
}
