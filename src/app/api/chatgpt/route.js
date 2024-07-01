import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Простая функция для локального ответа в случае ошибки API
function getLocalFallbackResponse(question) {
  return `Извините, в данный момент я не могу ответить на ваш вопрос: "${question}". Пожалуйста, попробуйте позже.`;
}

export async function POST(req) {
  const start = Date.now();

  try {
    const { question } = await req.json();

    if (!question) {
      throw new Error("Question is required");
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });

    console.log("ChatGPT request processed in", Date.now() - start, "ms");

    return new NextResponse(JSON.stringify(completion.choices[0].message), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing ChatGPT request:", error);

    // Проверка на ошибку превышения квоты
    if (error.status === 429 || error.code === "insufficient_quota") {
      console.warn("API quota exceeded. Using local fallback.");
      const fallbackResponse = getLocalFallbackResponse(req.question);
      return new NextResponse(JSON.stringify({ message: fallbackResponse }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Для других ошибок возвращаем 500 статус
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
