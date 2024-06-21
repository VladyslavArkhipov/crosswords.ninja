import CrosswordDisplay from "../components/CrosswordDisplay";
import MainDisplay from "../components/Main/MainDisplay";
import { auth } from "@/auth";
import { User } from "@/model/user-model";

export default async function Home() {
  const session = await auth();
  const user = await User.findOne({ email: session?.user.email });
  console.log(user);

  return (
    <>
      <MainDisplay user={user}></MainDisplay>
      <CrosswordDisplay></CrosswordDisplay>
    </>
  );
}
