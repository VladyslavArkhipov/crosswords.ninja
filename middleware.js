// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;

  // Обработка запросов к /api/webhook
  if (url.pathname === "/api/webhook") {
    // Создаем новый объект ответа
    const response = NextResponse.next();

    // Устанавливаем необходимые CORS заголовки
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://secure.wayforpay.com"
    );
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization"
    );

    // Для OPTIONS запросов возвращаем 200 OK
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: response.headers,
      });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/webhook"],
};

// src/app/api/webhook/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const buf = await request.text();
    const data = buf.toString();
    console.log("Payment Data Received:", data);

    const response = NextResponse.json({ status: "success" });

    // Устанавливаем более специфичные CORS заголовки
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://secure.wayforpay.com"
    );
    response.headers.set("Access-Control-Allow-Methods", "POST");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Добавляем обработчик OPTIONS запросов
export async function OPTIONS(request) {
  const response = new NextResponse(null, { status: 200 });

  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://secure.wayforpay.com"
  );
  response.headers.set("Access-Control-Allow-Methods", "POST");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
