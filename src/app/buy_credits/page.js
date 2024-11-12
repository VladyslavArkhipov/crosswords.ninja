// app/buy-credits/page.js (серверный компонент)

import BuyCreditsContent from "@/components/buyCredits/BuyCreditsContent";
import { auth } from "@/utils/auth";
import { User } from "@/model/user-model";

export default async function BuyCreditsPage() {
  const session = await auth(); // Получаем сессию на сервере
  const user = await User.findOne({ email: session?.user?.email });
  console.log(user);

  if (session) return <BuyCreditsContent user={user} />;
}
