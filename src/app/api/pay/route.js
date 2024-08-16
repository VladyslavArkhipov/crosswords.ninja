import { NextResponse } from "next/server";
import { User } from "@/model/user-model";
import { dbConnect } from "@/lib/mongo";

// Сопоставление суммы платежа с количеством generations
const amountToGenerations = (amount) => {
  if (amount === 0.1) return 5;
  if (amount === 0.2) return 10;
  if (amount === 0.3) return 15;
  return 0; // Значение по умолчанию, если сумма не соответствует ни одному из условий
};

export async function POST(req) {
  try {
    // Подключение к базе данных
    await dbConnect();

    // Получаем данные из формы
    const formData = await req.formData();

    // Преобразуем FormData в объект для удобного вывода
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    // Получаем данные из формы
    const transactionStatus = formData.get("transactionStatus");
    const amount = parseFloat(formData.get("amount")); // Преобразуем в число
    const orderReference = formData.get("orderReference");
    const email = formData.get("email");

    if (!transactionStatus || !orderReference || !email) {
      return NextResponse.json(
        {
          message: "Invalid request: missing required fields",
          formData: formDataObj,
        },
        { status: 400 }
      );
    }

    if (transactionStatus === "Approved") {
      // Получаем количество generations в зависимости от суммы
      const generationsToAdd = amountToGenerations(amount);

      if (generationsToAdd > 0) {
        // Обновляем поле generations у пользователя
        const updatedUser = await User.findOneAndUpdate(
          { email: email },
          { $inc: { generations: generationsToAdd } },
          { new: true } // Возвращаем обновленный документ
        );

        if (updatedUser) {
          console.log(
            `User ${email} updated with ${generationsToAdd} generations`
          );
          return NextResponse.json(
            { message: "Payment approved and user updated", user: updatedUser },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "Invalid amount for generations" },
          { status: 400 }
        );
      }
    } else {
      // Логика обработки неуспешного или ожидающего платежа
      console.log(`Order ${orderReference} failed or pending`);
      return NextResponse.json(
        { message: "Payment failed or pending", formData: formDataObj },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing payment callback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
