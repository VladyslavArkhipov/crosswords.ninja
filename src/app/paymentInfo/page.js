import { auth } from "@/utils/auth";
import { User } from "@/model/user-model";
import PaymentInfoDisplay from "@/components/PaymentInfo/PaymentInfoDisplay";

export default async function PaymentInfo() {
  const session = await auth();
  const user = await User.findOne({ email: session?.user.email });

  return (
    <>
      <PaymentInfoDisplay user={user} />
    </>
  );
}
