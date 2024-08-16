// app/api/pay/route.js (или другой файл для обработки)

import { NextResponse } from "next/server";
import { User } from "@/model/user-model";
import { dbConnect } from "@/lib/mongo";

const amountToGenerations = (amount) => {
  if (amount === 0.1) return 5;
  if (amount === 0.2) return 10;
  if (amount === 0.3) return 15;
  return 0;
};

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const transactionStatus = formData.get("transactionStatus");
    const amount = parseFloat(formData.get("amount"));
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
      const generationsToAdd = amountToGenerations(amount);

      if (generationsToAdd > 0) {
        const updatedUser = await User.findOneAndUpdate(
          { email: email },
          { $inc: { generations: generationsToAdd } },
          { new: true }
        );

        if (updatedUser) {
          console.log(
            `User ${email} updated with ${generationsToAdd} generations`
          );

          return NextResponse.redirect(
            `https://crosswords-ninja.vercel.app/paymentResult?status=Approved&orderReference=${orderReference}&amount=${amount}`
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
      console.log(`Order ${orderReference} failed or pending`);
      return NextResponse.redirect(
        `/payment-result?status=Failed&orderReference=${orderReference}`
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
