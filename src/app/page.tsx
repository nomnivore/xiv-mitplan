import { Button } from "@/components/ui/button";
import { getMitplansByUserId } from "@/lib/mitplan";
import { getCurrentSession } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  // show my mitplans if logged in
  const { user } = await getCurrentSession();

  let mitplans = null;

  if (user) {
    mitplans = await getMitplansByUserId(user.id);
  }
  
  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="outline" asChild>
        <Link href="/plan">view sample mitplan</Link>
      </Button>
      <br />
      { mitplans && (<>
        <h2 className="text-2xl">My Mitplans</h2>
        <div className="flex flex-col gap-2 my-4">
          {mitplans.map((plan) => (
            <Button key={plan.id} asChild variant="outline">
              <Link href={`/plan/${plan.id}`}>
                {plan.name}
              </Link>
            </Button>
          ))}
        </div>
      </>)}
    </div>
  );
}
