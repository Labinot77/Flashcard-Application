
import Image from "next/image";
import { Separator } from "../ui/separator";
import FirstRouteItem from "./Routes/FirstRouteItem";
import SecondRouteItem from "./Routes/SecondRouteItem";
import ThirdRouteItem from "./Routes/ThirdRouteItem";
import { getCurrentSessionUser, getCurrentSessionUserData } from "@/lib/actions/User";
import UserInterface from "./UserInterface";
import { redirect, useParams } from "next/navigation";

const Sidebar = async () => {
  const currentUser = await getCurrentSessionUserData();
  const userClasses = currentUser?.classUsers;
  if (!currentUser?.id) {
    redirect("/authentication/register")
  }

  return (
    <aside className='h-full rounded-md min-w-[17rem] '>
      <div className="flex flex-col p-4 h-full">
        <div className="inline-flex items-center gap-5">
          <Image
            src='/logo.png'
            alt="logo"
            className="rounded-lg"
            width={50}
            height={50}
          />
          <p className="text-xl text-primary font-medium">Q-Flash</p>
        </div>


        <div className="flex flex-col justify-between h-full ">
          <ul className="mt-5">

            <FirstRouteItem />
            <Separator className="mt-4 mb-4" />
            <SecondRouteItem userClasses={userClasses!} />
            <Separator className="mt-4 mb-4" />
            <ThirdRouteItem />
          </ul>

          
          <UserInterface currentUser={currentUser!} />


        </div>
      </div>
    </aside>
  )
}

export default Sidebar