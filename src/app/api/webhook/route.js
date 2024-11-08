// src/app/api/webhook/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/models/User"; // Убедитесь, что путь до модели правильный
import CryptoJS from "crypto-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Функция для проверки подписи
function verifySignature(data) {
  const secretKey = "7862ddd38cb6b88428bf1f8cc1c828f1e415a8f1";
  const { merchantSignature, ...rest } = data;

  const signatureFields = [
    rest.merchantAccount,
    rest.orderReference,
    rest.amount,
    rest.currency,
    rest.authCode,
    rest.cardPan,
    rest.transactionStatus,
    rest.reasonCode,
  ];

  const signatureString = signatureFields.join(";");
  const calculatedSignature = CryptoJS.HmacMD5(
    signatureString,
    secretKey
  ).toString(CryptoJS.enc.Hex);

  return calculatedSignature === merchantSignature;
}

export async function POST(request) {
  const start = Date.now();

  try {
    // Подключаемся к БД
    await dbConnect();
    console.log("Database connected");

    // Получаем и парсим данные платежа
    const data = await request.text();
    const paymentData = Object.fromEntries(new URLSearchParams(data));
    console.log("Payment Data Received:", paymentData);

    // Проверяем статус транзакции
    if (paymentData.transactionStatus !== "Approved") {
      console.log("Transaction not approved:", paymentData.transactionStatus);
      return NextResponse.json({
        status: "error",
        message: "Transaction not approved",
      });
    }

    // Проверяем подпись
    if (!verifySignature(paymentData)) {
      console.log("Invalid signature");
      return NextResponse.json({
        status: "error",
        message: "Invalid signature",
      });
    }

    // Получаем количество generations из productName
    const productName = paymentData.productName;
    const generations = parseInt(productName.split(" ")[0]);

    // Обновляем количество generations у пользователя
    const result = await User.updateOne(
      { email: paymentData.clientEmail },
      { $inc: { generations: generations } }
    );

    if (result.modifiedCount === 0) {
      console.log("User not found or update failed");
      return NextResponse.json({
        status: "error",
        message: "Failed to update user generations",
      });
    }

    console.log(
      `Updated generations for ${paymentData.clientEmail} in`,
      Date.now() - start,
      "ms"
    );

    return NextResponse.json({
      status: "success",
      message: `Added ${generations} generations to ${paymentData.clientEmail}`,
    });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
