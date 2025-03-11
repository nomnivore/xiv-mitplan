import { Button } from "@/components/ui/button";
import { getCurrentSession, logout } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  const { user } = await getCurrentSession();

  if (!user) redirect("login");
  return (
    // very simple form for now
    <form action={logout}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
