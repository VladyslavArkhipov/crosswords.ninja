import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req) {
  const {
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount,
    productName,
    productCount,
    productPrice,
    tryMerchantSignature,
  } = await req.json();

  try {
    // Подготовка параметров для Wayforpay
    const params = {
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      amount,
      currency: "USD",
      productName: [productName],
      productCount: [productCount],
      productPrice: [productPrice],
      defaultPaymentSystem: "card",
      merchantSignature: tryMerchantSignature,
    };

    // Кодирование параметров в URL-строку
    const queryParams = new URLSearchParams(params);

    // Отправка POST-запроса на Wayforpay
    const response = await fetch("https://secure.wayforpay.com/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: queryParams.toString(),
    });

    if (response.ok) {
      // Возвращение HTML-страницы для оплаты
      const html = await response.text();
      return new NextResponse(html, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    } else {
      console.error("Error processing payment request:", response.statusText);
      return new NextResponse(JSON.stringify({ error: response.statusText }), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error processing payment request:", error);

    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
