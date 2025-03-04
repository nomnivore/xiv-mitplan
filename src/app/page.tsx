import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  const { user } = await getCurrentSession();

  function userGreeting() {
    if (user !== null) {
      return `hello ${user.name}!`;
    }

    return "you are not logged in";
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="outline" asChild>
        <Link href="/plan">view sample mitplan</Link>
      </Button>
      <br />
      <div>{userGreeting()}</div>
    </div>
  );
}
