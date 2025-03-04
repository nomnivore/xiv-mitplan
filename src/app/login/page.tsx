import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Login() {
  return (
    <>
      <h1>Sign In</h1>
      <Button variant="default" asChild>
        <Link href="/login/discord">Sign in with Discord</Link>
      </Button>
    </>
  );
}
