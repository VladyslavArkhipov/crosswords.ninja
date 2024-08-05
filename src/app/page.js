import MainDisplay from "../components/MainDisplay/MainDisplay";
import { auth } from "@/auth";
import { User } from "@/model/user-model";

export default async function Home() {
  const session = await auth();
  const user = await User.findOne({ email: session?.user.email });

  return (
    <>
      <MainDisplay user={user}></MainDisplay>
    </>
  );
}
