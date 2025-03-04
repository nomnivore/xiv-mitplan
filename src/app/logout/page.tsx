import { Button } from "@/components/ui/button";
import { deleteSessionTokenCookie } from "@/lib/cookies";
import { getCurrentSession, invalidateSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  return (
    // very simple form for now
    <form action={logout}>
      <Button type="submit">Logout</Button>
    </form>
  );
}

async function logout(): Promise<ActionResult> {
  "use server";
  console.log("action ran");
  const { session } = await getCurrentSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  await invalidateSession(session.id);
  deleteSessionTokenCookie();
  return redirect("/login");
}

type ActionResult = {
  error: string | null;
};
