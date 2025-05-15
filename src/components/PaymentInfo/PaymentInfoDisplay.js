"use client";
import Header from "@/components/common/Header/Header";
import Title from "@/components/MainDisplay/Title";
import Footer from "@/components/common/Footer/Footer";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentInfoDisplay(props) {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const status = searchParams.get("transactionStatus");
    if (status) {
      setPaymentStatus(status);
    }
  }, [searchParams]);

  return (
    <>
      <Header user={props.user} />
      <Title />
      <div>
        {paymentStatus ? (
          <div>
            <h1>Payment Status: {paymentStatus}</h1>
            {paymentStatus === "Approved" ? (
              <p>Thank you for your purchase!</p>
            ) : (
              <p>Payment failed. Please try again.</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
}
