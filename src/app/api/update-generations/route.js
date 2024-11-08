// src/app/api/update-generations/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import CryptoJS from "crypto-js";

export async function POST(request) {
  console.log("[Update Generations] Starting update process");

  try {
    const paymentData = await request.json();
    console.log("[Update Generations] Received payment data:", paymentData);

    // Проверяем статус транзакции
    if (paymentData.transactionStatus !== "Approved") {
      console.log(
        "[Update Generations] Transaction not approved:",
        paymentData.transactionStatus
      );
      return NextResponse.json(
        {
          status: "error",
          message: "Transaction not approved",
        },
        { status: 400 }
      );
    }

    // Подключаемся к БД
    await dbConnect();
    console.log("[Update Generations] Database connected");

    // Получаем количество generations из productName
    const generations = parseInt(paymentData.productName.split(" ")[0]);
    console.log("[Update Generations] Generations to add:", generations);

    // Находим пользователя перед обновлением
    const userBefore = await User.findOne({ email: paymentData.clientEmail });
    console.log("[Update Generations] User before update:", userBefore);

    if (!userBefore) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found",
        },
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
        {
          status: "error",
          message: "Failed to update generations",
        },
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
      {
        status: "error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
