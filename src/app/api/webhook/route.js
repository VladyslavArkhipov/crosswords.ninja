// src/app/api/webhook/route.js
import { NextResponse } from "next/server";

// Новый способ конфигурации route handler
export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function POST(request) {
  try {
    const data = await request.text();
    console.log("Payment Data Received:", data);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
