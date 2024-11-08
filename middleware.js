// middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;

  // Обработка запросов только к /api/webhook
  if (url.pathname === "/api/webhook") {
    const origin = request.headers.get("origin");
    if (origin === "https://secure.wayforpay.com") {
      // Пропускаем запрос от Wayforpay
      return NextResponse.next();
    } else {
      // Блокируем запросы от других источников
      return NextResponse.rewrite(new URL("/404", request.url));
    }
  }

  return NextResponse.next();
}
