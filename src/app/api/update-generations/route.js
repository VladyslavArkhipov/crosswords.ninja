// src/app/api/update-generations/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";

export async function POST(request) {
  console.log("[Update Generations] Starting update process");

  try {
    
    const contentType = request.headers.get("content-type") || "";
    console.log("[Update Generations] Content-Type received:", contentType);

    let paymentData;

    if (contentType.includes("application/json")) {
      paymentData = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      paymentData = Object.fromEntries(formData.entries());
      const key = Object.keys(paymentData)[0];
      paymentData = JSON.parse(key);
    } else {
      throw new Error(`Unsupported content type: ${contentType}`);
    }

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

    await dbConnect();
    console.log("[Update Generations] Database connected");

    let generations;
    if (paymentData.amount === 0.1) generations = 5;
    if (paymentData.amount === 0.2) generations = 10;
    if (paymentData.amount === 0.3) generations = 15;

    console.log("[Update Generations] Generations to add:", generations);


    const userBefore = await User.findOne({ email: email });
    console.log("[Update Generations] User before update:", userBefore);

    if (!userBefore) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }

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
