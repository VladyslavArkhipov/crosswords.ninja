import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { messages, model } = await request.json();

    const completion = await openai.chat.completions.create({
      messages: messages || [
        { role: "system", content: "You are a helpful assistant." },
      ],
      model: model || "gpt-3.5-turbo",
    });

    return new Response(JSON.stringify(completion.choices[0]), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

// Пример вызова POST запроса с задержкой
(async function main() {
  for (let i = 0; i < 5; i++) {
    // Пример с 5 запросами
    const response = await fetch("http://localhost:3000/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      }),
    });

    const responseBody = await response.json();
    console.log(responseBody);

    // Добавление задержки между запросами
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Задержка 1 секунда
  }
})();
