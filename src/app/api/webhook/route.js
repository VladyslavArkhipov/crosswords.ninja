// src/app/api/webhook/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  const buf = await request.text();
  const data = buf.toString();

  // Handle the data from Wayforpay here
  // Update your database or perform other actions

  // Redirect the user to the payment success page
  return NextResponse.redirect(new URL("/payment-success", request.url));
}
