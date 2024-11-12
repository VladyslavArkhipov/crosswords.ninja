// src/app/api/update-generations/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import CryptoJS from "crypto-js";

export async function POST(request) {
  console.log("[Update Generations] Starting update process");

  try {
    // Логируем заголовок Content-Type для точной диагностики
    const contentType = request.headers.get("content-type") || "";
    console.log("[Update Generations] Content-Type received:", contentType);

    let paymentData;

    // Проверка формата данных на основе Content-Type
    if (contentType.includes("application/json")) {
      paymentData = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      paymentData = Object.fromEntries(formData.entries());
    } else {
      throw new Error(`Unsupported content type: ${contentType}`);
    }

    // Если paymentData содержит строку, попробуем распарсить её как JSON
    if (typeof paymentData === "string") {
      paymentData = JSON.parse(Object.keys(paymentData)[0]);
    }

    console.log("[Update Generations] Parsed payment data:", paymentData);

    // Подключаемся к базе данных
    await dbConnect();
    console.log("[Update Generations] Database connected");

    // Обрабатываем данные, увеличивая количество generations
    let generations;
    if (paymentData.amount === 3) generations = 10;
    console.log("[Update Generations] Generations to add:", generations);

    // Проверяем существование пользователя
    const userBefore = await User.findOne({ email: paymentData.clientEmail });
    console.log("[Update Generations] User before update:", userBefore);

    if (!userBefore) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    // Обновляем количество generations
    const result = await User.updateOne(
      { email: paymentData.clientEmail },
      { $inc: { generations: generations } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { status: "error", message: "Failed to update generations" },
        { status: 500 }
      );
    }

    // Получаем обновленные данные пользователя
    const userAfter = await User.findOne({ email: paymentData.clientEmail });
    console.log("[Update Generations] User after update:", userAfter);

    return NextResponse.json({
      status: "success",
      message: `Added ${generations} generations to ${paymentData.clientEmail}`,
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
