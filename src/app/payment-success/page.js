"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  /* useEffect(() => {
    const processPayment = async () => {
      try {
        // Собираем все параметры из URL
        const paymentData = {
          merchantAccount: searchParams.get("merchantAccount"),
          orderReference: searchParams.get("orderReference"),
          amount: searchParams.get("amount"),
          currency: searchParams.get("currency"),
          authCode: searchParams.get("authCode"),
          cardPan: searchParams.get("cardPan"),
          transactionStatus: searchParams.get("transactionStatus"),
          reasonCode: searchParams.get("reasonCode"),
          clientEmail: searchParams.get("clientEmail"),
          productName: searchParams.get("productName"),
          merchantSignature: searchParams.get("merchantSignature"),
        };

        console.log("Payment Data:", paymentData);
        setPaymentDetails(paymentData);

        const response = await fetch("/api/update-generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to update generations");
        }

        setStatus("success");
        console.log("Database update result:", data);
      } catch (err) {
        console.error("Error processing payment:", err);
        setError(err.message);
        setStatus("error");
      }
    };

    processPayment();
  }, [searchParams]); */

  return (
    <div>
      {status === "processing" && (
        <div>
          <h1>Обработка платежа...</h1>
          <p>Пожалуйста, подождите</p>
        </div>
      )}

      {status === "success" && (
        <div>
          <h1>Оплата прошла успешно!</h1>
          <p>Спасибо за покупку. Ваш заказ был успешно оплачен.</p>
          {paymentDetails && (
            <div>
              <p>Email: {paymentDetails.clientEmail}</p>
              <p>
                Сумма: {paymentDetails.amount} {paymentDetails.currency}
              </p>
              <p>Номер заказа: {paymentDetails.orderReference}</p>
            </div>
          )}
        </div>
      )}

      {status === "error" && (
        <div>
          <h1>Произошла ошибка</h1>
          <p>{error}</p>
          <p>Пожалуйста, свяжитесь с поддержкой</p>
        </div>
      )}
    </div>
  );
}
