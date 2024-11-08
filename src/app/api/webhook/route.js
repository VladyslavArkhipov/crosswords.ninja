// src/app/api/webhook/route.js
import { NextResponse } from "next/server";

// Конфигурация для route handler
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const data = await request.text();
    console.log("Payment Data Received:", data);

    // Простой ответ без дополнительных заголовков
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
