// src/app/api/webhook/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  const buf = await request.text();
  const data = buf.toString();

  // Обработка данных от Wayforpay (например, обновление базы данных)

  // Возвращаем простой ответ для Wayforpay
  return NextResponse.json({ status: "success" });
}
