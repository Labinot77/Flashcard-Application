import { DefaultButton } from "@/components/Buttons/DefaultButton";
import { getCurrentSessionUser } from "@/lib/actions/User";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentSessionUser();

  if (user) {
    redirect("/collections");
  }

  return (
    <main className="flex items-center justify-center h-screen">
        <DefaultButton pending={false} >
            <Link href="/authentication/register">log in</Link>
        </DefaultButton>
    </main>
  );
}
