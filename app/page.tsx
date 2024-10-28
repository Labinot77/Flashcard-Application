import { DefaultButton } from "@/components/Buttons/DefaultButton";
import LandingPageSitePreview from "@/components/LandingPageSitePreview";
import { getCurrentSessionUser } from "@/lib/actions/User";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentSessionUser();

  return (
    <div className="h-full relative"
      style={{ backgroundImage: `url("/background-4.png")` }}
    >
      <div className="h-full mx-auto max-w-6xl flex flex-col items-center text-center gap-8 ">
        <h1 className="pt-16 text-[4.5rem] font-bold">
          The new standart for <br /> <span>Quick-Serve</span>
        </h1>
        <p className="w-[50%] text-lg">
          Save thousands in labor costs and delight your customers with Snackpass, the all-in-one platform designed specifically for quick-serve restaurants.
        </p>

        <DefaultButton pending={false} >
          {user?.id ? (
            <Link href="/collections">Go to dashboard</Link>
          ) : (
            <Link href="/authentication/register">Get started</Link>
          )
          }
        </DefaultButton>


        <LandingPageSitePreview />
      </div>
    </div>
  );
}
