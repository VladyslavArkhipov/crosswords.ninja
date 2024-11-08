// src/app/api/webhook/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  // Логируем заголовки для отладки
  console.log("Request Headers:", request.headers);

  const buf = await request.text();
  const data = buf.toString();

  console.log("Payment Data Received:", data);

  // Добавляем произвольный ответ, чтобы Next.js пропустил этот запрос
  const response = NextResponse.json({ status: "success" });
  response.headers.set("Access-Control-Allow-Origin", "*"); // Разрешаем любые источники

  return response;
}
