import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewPlanForm } from "./newPlanForm";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function NewPlanPage() {
  // redirect if not logged in
  const { user } = await getCurrentSession();
  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">New Mitplan</CardTitle>
          <CardDescription>
            Adds a new mitplan under your profile. These fields can be changed
            later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewPlanForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
