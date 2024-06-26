import { auth } from "@/auth";
import Content from "@/components/generatedCrossword/Content";
import { User } from "@/model/user-model";

export default async function GeneratedCrossword() {
  const session = await auth();
  const user = await User.findOne({ email: session?.user.email });

  return <Content user={user}></Content>;
}
