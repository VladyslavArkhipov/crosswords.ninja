// src/app/api/webhook/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json(); // Получаем JSON от Wayforpay

  // Пример: проверяем успешность оплаты (это зависит от структуры данных Wayforpay)
  if (data.transactionStatus === "Approved") {
    // Здесь можно обновить базу данных, отметив заказ как оплаченный
    console.log("Оплата успешна", data);
  } else {
    console.log("Оплата не прошла", data);
  }

  // Возвращаем 200 OK, чтобы Wayforpay знал, что мы успешно обработали запрос
  return NextResponse.json({ status: "ok" });
}
