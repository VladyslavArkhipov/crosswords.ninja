import { NextResponse } from "next/server";
import { createUser } from "@/queries/users";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";

export const POST = async (request) => {
  const start = Date.now(); // Начало отсчета времени выполнения
  const { email, password } = await request.json();

  console.log("Received data:", email, password);

  // Create a DB Connection
  try {
    await dbConnect();
  } catch (err) {
    console.error("Database connection error:", err);
    return new NextResponse("Database connection error", {
      status: 500,
    });
  }
  console.log("Database connected");

  // Encrypt the password
  let hashedPassword;
  try {
    console.log("Hashing the password...");
    hashedPassword = await bcrypt.hash(password, 5);
  } catch (err) {
    console.error("Password hashing error:", err);
    return new NextResponse("Password hashing error", {
      status: 500,
    });
  }
  console.log("Password hashed");

  // Form a DB payload
  const newUser = {
    password: hashedPassword,
    email,
  };

  // Update the DB
  try {
    console.log("Creating user...");
    await createUser(newUser);
  } catch (err) {
    console.error("User creation error:", err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }

  console.log("User created in", Date.now() - start, "ms");

  return new NextResponse("User has been created", {
    status: 201,
  });
};
