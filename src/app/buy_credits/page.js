import BuyCreditsContent from "@/components/buyCredits/BuyCreditsContent";
import { auth } from "@/utils/auth";
import { User } from "@/model/user-model";

export default async function BuyCredits() {
  const session = await auth();
  const user = session?.user;
  console.log("[BuyCredits] Loaded user:", user);

  // Проверка наличия пользователя перед рендерингом контента
  if (user) {
    return <BuyCreditsContent user={user} />; // или соответствующий компонент загрузки
  }
}
