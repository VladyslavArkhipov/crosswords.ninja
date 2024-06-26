import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { words } = await request.json();

    // Здесь вы можете сделать любые обработки данных

    // Возвращаем данные в формате JSON
    return NextResponse.json({ words }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (request) => {
  return new NextResponse("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
};
