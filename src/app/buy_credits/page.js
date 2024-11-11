import BuyCreditsContent from "@/components/buyCredits/BuyCreditsContent";
import { auth } from "@/utils/auth";
import { User } from "@/model/user-model";

export default async function BuyCredits() {
  const fetchUser = async () => {
    const session = await auth();
    return session?.user || null;
  };

  const user = await fetchUser();

  console.log("[BuyCredits] Loaded user:", user);

  if (user) {
    return <BuyCreditsContent user={user} />;
  } else {
    console.log("[BuyCredits] User is undefined or not loaded.");
    return <div>Loading...</div>; // или другой компонент для загрузки
  }
}
