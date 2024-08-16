import { NextResponse } from "next/server";
import { getUserByEmail, updateUserGenerations } from "@/queries/users"; // Import the necessary functions
import { dbConnect } from "@/lib/mongo";

export const POST = async (request) => {
  const { words, email } = await request.json(); // Extract the user's email from the request body

  // Create a DB Connection
  try {
    await dbConnect();
  } catch (err) {
    console.error("Database connection error:", err);
    return new NextResponse("Database connection error", {
      status: 500,
    });
  }

  // Query the database for the user using the email
  let user;
  try {
    user = await getUserByEmail(email);
  } catch (err) {
    console.error("Error querying user:", err);
    return new NextResponse("Error querying user", {
      status: 500,
    });
  }

  // If the user is found and has generations greater than 0, decrement the generation count
  if (user && user.generations > 0) {
    try {
      await updateUserGenerations(email, user.generations - 1);
    } catch (err) {
      console.error("Error updating user generations:", err);
      return new NextResponse("Error updating user generations", {
        status: 500,
      });
    }
  }

  // Continue with the existing logic for processing the words
  // ...

  // Return the response
  return NextResponse.json({ words }, { status: 200 });
};

export const GET = async (request) => {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
};
