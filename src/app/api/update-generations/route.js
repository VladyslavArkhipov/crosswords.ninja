// src/app/api/update-generations/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

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
      // Преобразуем FormData в объект
      paymentData = Object.fromEntries(formData.entries());
      // Получаем первый ключ объекта, так как данные приходят в виде объекта с одним ключом
      const key = Object.keys(paymentData)[0];
      // Распарсиваем строку в объект, так как данные приходят в виде JSON-строки
      paymentData = JSON.parse(key);
    } else {
      throw new Error(`Unsupported content type: ${contentType}`);
    }

    // Теперь paymentData должен быть объектом, содержащим данные платежа
    const amount = paymentData.amount;

    const email = paymentData.email;

    console.log(email);

    console.log("Amount:", amount);

    console.log("[Update Generations] Parsed payment data:", paymentData);

    if (paymentData.transactionStatus !== "Approved") {
      return NextResponse.json(
        { status: "error", message: "Transaction not approved" },
        { status: 400 }
      );
    }

    // Подключаемся к базе данных
    await dbConnect();
    console.log("[Update Generations] Database connected");

    // Обрабатываем данные, увеличивая количество generations
    let generations;
    if (paymentData.amount === 0.1) generations = 10;
    console.log("[Update Generations] Generations to add:", generations);

    // Проверяем существование пользователя

    const userBefore = await User.findOne({ email: email });
    console.log("[Update Generations] User before update:", userBefore);

    if (!userBefore) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

    // Обновляем количество генераций
    const result = await User.updateOne(
      { email: email },
      { $inc: { generations: generations } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { status: "error", message: "Failed to update generations" },
        { status: 500 }
      );
    }

    // Получаем обновленные данные пользователя
    const userAfter = await User.findOne({ email: email });
    console.log("[Update Generations] User after update:", userAfter);

    return NextResponse.json({
      status: "success",
      message: `Added ${generations} generations to ${email}`,
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
