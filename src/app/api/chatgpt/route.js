import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `Your task:

1. Create questions for a crossword puzzle using the words from the list.
2. The questions should be written in the same language as the words.
3. Take into account the word numbers — they indicate the words' positions in the crossword.
4. The questions should be simple and precise to be suitable for a crossword.
5. If the words for which you need to come up with questions are written in German, then you should write the questions in German as well.
6. If the words for which you need to come up with questions are written in English, then you should write the questions in English as well.
7. If the words for which you need to come up with questions are written in Russian, then you should write the questions in Russian as well.
8. If the words for which you need to come up with questions are written in French, then you should write the questions in French as well.
9. If the words for which you need to come up with questions are written in German, then you should write the questions in German as well.
10. If the words for which you need to come up with questions are written in Spanish, then you should write the questions in Spanish as well.
Response format:

Across clues:
[Word number in the crossword]. [Question]

Down clues:
[Word number in the crossword]. [Question]

Example:

Across words: 1snow, 3road.
Down words: 2rain, 4pen.

Response:

Across:

1. What falls from the sky white in winter?
3. What do cars drive on?
Down:
2. What is the water that falls from the sky called?
4. What can you use to write on paper with ink?
Your words:`;

// Простая функция для локального ответа в случае ошибки API

export async function POST(req) {
  const { chatgptString } = await req.json();

  try {
    if (!chatgptString) {
      throw new Error("Words are required");
    }

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
