// src/app/api/update-generations/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

export async function POST(request) {
  console.log("[Update Generations] Starting update process");

  try {
    // Подключаемся к базе данных
    await dbConnect();
    console.log("[Update Generations] Database connected");

    // Проверяем заголовок Content-Type
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { status: "error", message: "Unsupported content type" },
        { status: 400 }
      );
    }

    // Получаем и парсим данные запроса
    const paymentData = await request.json();
    console.log("[Update Generations] Parsed payment data:", paymentData);

    // Проверяем статус транзакции
    if (paymentData.transactionStatus !== "Approved") {
      return NextResponse.json(
        { status: "error", message: "Transaction not approved" },
        { status: 400 }
      );
    }

    // Проверяем наличие и корректность email
    const { clientEmail, amount } = paymentData;
    if (!clientEmail) {
      return NextResponse.json(
        { status: "error", message: "Client email is missing" },
        { status: 400 }
      );
    }

    // Устанавливаем количество генераций в зависимости от суммы
    let generations = 0;
    if (amount === 0.1) generations = 10;

    console.log("[Update Generations] Generations to add:", generations);

    // Проверяем существование пользователя
    const userBefore = await User.findOne({ email: clientEmail });
    console.log("[Update Generations] User before update:", userBefore);

    if (!userBefore) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    // Обновляем количество генераций
    const result = await User.updateOne(
      { email: clientEmail },
      { $inc: { generations: generations } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { status: "error", message: "Failed to update generations" },
        { status: 500 }
      );
    }

    // Получаем обновленные данные пользователя
    const userAfter = await User.findOne({ email: clientEmail });
    console.log("[Update Generations] User after update:", userAfter);

    return NextResponse.json({
      status: "success",
      message: `Added ${generations} generations to ${clientEmail}`,
      oldGenerations: userBefore.generations,
      newGenerations: userAfter.generations,
    });
  } catch (error) {
    console.error("[Update Generations] Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
