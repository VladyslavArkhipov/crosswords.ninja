// app/buy-credits/page.js (серверный компонент)

import BuyCreditsContent from "@/components/buyCredits/BuyCreditsContent";
import { auth } from "@/utils/auth";

export default async function BuyCreditsPage() {
  const session = await auth(); // Получаем сессию на сервере

  if (session) return <BuyCreditsContent session={session} />;
}
