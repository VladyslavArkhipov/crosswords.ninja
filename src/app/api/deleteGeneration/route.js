import { deleteGeneration } from "@/queries/users";
import { auth } from "@/auth";

export async function GET(req, res) {
  const session = await auth(req, res);

  if (session?.user) {
    console.log(session.user);
    // Continue with your deleteGeneration logic here
    return new Response(JSON.stringify({ message: "User data logged" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    console.log("No user session");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
