import BuyCreditsContent from "@/components/buyCredits/BuyCreditsContent";
import { auth } from "@/utils/auth";
import { User } from "@/model/user-model";

export default async function BuyCredits() {
  const session = await auth();
  const user = await User.findOne({ email: session?.user?.email });

  return <BuyCreditsContent user={user} />;
}
