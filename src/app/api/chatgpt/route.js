import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { promises as fs } from "fs"; // Модуль для работы с файловой системой

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getPrompt() {
  try {
    const prompt = await fs.readFile("src/PROMPT/prompt.txt", "utf-8");
    return prompt;
  } catch (error) {
    console.error("Error reading prompt file:", error);
    throw new Error("Failed to load prompt");
  }
}

export async function POST(req) {
  const { chatgptString } = await req.json();

  try {
    if (!chatgptString) {
      throw new Error("Words are required");
    }

    const prompt = await getPrompt();

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt + chatgptString,
        },
      ],
      model: "gpt-4o-mini",
    });

    const answer = completion.choices[0].message.content;

    return NextResponse.json({ answer }, { status: 200 });
  } catch (error) {
    console.error("Error processing ChatGPT request:", error);

    // Для других ошибок возвращаем 500 статус
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
