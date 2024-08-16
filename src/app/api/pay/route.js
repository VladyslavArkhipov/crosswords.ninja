import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Получаем данные из тела запроса
    const { transactionStatus, amount, orderReference } = await req.json();

    // Проверяем статус транзакции
    if (!transactionStatus || !orderReference) {
      return NextResponse.json(
        { message: "Invalid request: missing required fields" },
        { status: 400 }
      );
    }

    // Логика обработки успешного платежа
    if (transactionStatus === "Approved") {
      // Обновляем статус заказа в базе данных или выполняем другую логику
      console.log(`Order ${orderReference} approved with amount: ${amount}`);

      // Возвращаем ответ об успешной обработке
      return NextResponse.json(
        { message: "Payment approved" },
        { status: 200 }
      );
    } else {
      // Логика обработки неуспешного или ожидающего платежа
      console.log(`Order ${orderReference} failed or pending`);

      // Возвращаем ответ о неуспешной обработке
      return NextResponse.json(
        { message: "Payment failed or pending" },
        { status: 400 }
      );
    }
  } catch (error) {
    // Ловим ошибки и возвращаем статус 500
    console.error("Error processing payment callback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Метод не разрешен для GET-запросов
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
