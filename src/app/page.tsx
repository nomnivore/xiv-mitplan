import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="link" asChild>
        <Link href="/plan">view sample mitplan</Link>
      </Button>
    </div>
  );
}
