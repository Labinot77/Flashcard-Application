
import { Separator } from "../ui/separator";
import FirstRouteItem from "./Routes/FirstRouteItem";
import ThirdRouteItem from "./Routes/ThirdRouteItem";
import { getCurrentSessionUserData } from "@/lib/actions/User";
import UserInterface from "./UserInterface";
import { redirect } from "next/navigation";

const Sidebar = async () => {
  const currentUser = await getCurrentSessionUserData();
  if (!currentUser?.id) {
    redirect("/authentication/register")
  }

  return (
 <aside className='hidden lg:block h-full rounded-md min-w-[17rem] '>
      <div className="flex flex-col p-4 h-full">

        <div className="flex flex-col justify-between h-full ">
          <ul className="mt-5">
            <FirstRouteItem />
            <Separator className="mt-4 mb-4" />
            <ThirdRouteItem currentUser={currentUser} />
          </ul>
          <UserInterface currentUser={currentUser!} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar