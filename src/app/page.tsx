import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="outline" asChild>
        <Link href="/plan">view sample mitplan</Link>
      </Button>
      <br />
    </div>
  );
}
