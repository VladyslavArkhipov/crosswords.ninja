import BuyCreditsContent from "@/components/buyCredits/BuyCreditsContent";
import { auth } from "@/utils/auth";
import { User } from "@/model/user-model";

export default async function BuyCredits() {
  const session = await auth();
  const user = await User.findOne({ email: session?.user?.email });
  console.log("[BuyCredits] Loaded user:", user);

  // Проверка наличия пользователя перед рендерингом контента
  if (!user) {
    return <p>Loading user data...</p>; // или соответствующий компонент загрузки
  }

  return <BuyCreditsContent user={user} />;
}
