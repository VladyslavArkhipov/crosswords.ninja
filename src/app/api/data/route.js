export async function GET() {
  const data = { value: Math.round(Math.random() * 10) }; // Пример данных, которые вы хотите отправить
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
