import BuyCreditsContent from "@/components/buyCredits/BuyCreditsContent";
import { auth } from "@/utils/auth";
import { User } from "@/model/user-model";

// Создаём кеш объекта
let userCache = null;

export default async function BuyCredits() {
  const session = await auth();

  // Если пользователь уже закеширован, используем его
  if (userCache && userCache.email === session?.user?.email) {
    console.log(
      "[BuyCredits] Используем кешированного пользователя:",
      userCache
    );
    return <BuyCreditsContent user={userCache} />;
  }
}
