import { auth } from "@/utils/auth";
import GeneratedCrosswordContent from "@/components/generatedCrossword/GeneratedCrosswordContent";
import { User } from "@/model/user-model";

export default async function GeneratedCrossword() {
  const session = await auth();
  const user = await User.findOne({ email: session?.user.email });

  return <GeneratedCrosswordContent user={user} />;
}
