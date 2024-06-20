import { auth } from "@/auth";

import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();

  console.log(session.user);

  return (
    <div className="flex flex-col items-center m-4">
      {session?.user?.name && session?.user?.image ? (
        <>
          <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
        </>
      ) : (
        <h1 className="text-3xl my-2">Welcome, {session?.user?.email}</h1>
      )}
      <a>Delete 1 generation</a>
    </div>
  );
};

export default HomePage;
