import BuyCreditsContent from "@/components/buyCredits/BuyCreditsContent";
import { auth } from "@/utils/auth";
import { User } from "@/model/user-model";

export default async function BuyCredits() {
  const User = async function () {
    const session = await auth();
    const user = session?.user;
    return user;
  };

  const user = await User();

  console.log("[BuyCredits] Loadedded user:", user);

  // Проверка наличия пользователя перед рендерингом контента
  if (user) {
    return <BuyCreditsContent user={user} />; // или соответствующий компонент загрузки
  }
}
