/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  async headers() {
    return [
      {
        // Применяем эти заголовки к webhook эндпоинту
        source: "/api/webhook",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://secure.wayforpay.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
  },
  // Отключаем проверку origin для Server Actions
  experimental: {
    serverActions: {
      allowedOrigins: ["secure.wayforpay.com", "crosswords-ninja.vercel.app"],
    },
  },
};

export default nextConfig;
