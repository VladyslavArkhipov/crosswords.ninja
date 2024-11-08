// src/app/api/webhook/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  // Чтение и преобразование тела запроса
  const buf = await request.text();
  const data = buf.toString();

  // Логирование данных платежа для отладки
  console.log("Payment Data Received:", data);

  // Здесь можно добавить любую дополнительную обработку данных платежа,
  // например, обновление базы данных о статусе заказа и т.д.

  // Возвращаем простой JSON-ответ для Wayforpay
  return NextResponse.json({ status: "success" });
}
