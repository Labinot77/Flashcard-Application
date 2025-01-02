
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import FirstRouteItem from "./Routes/FirstRouteItem"
import { Separator } from "../ui/separator"
import ThirdRouteItem from "./Routes/ThirdRouteItem"
import UserInterface from "./UserInterface"
import { getAllUsers, getCurrentSessionUserData } from "@/lib/actions/User"
import { redirect } from "next/navigation"

const MobileSidebar = async () => {
  const currentUser = await getCurrentSessionUserData();
  if (!currentUser?.id) {
    redirect("/authentication/register")
  }
  const AllUsers = await getAllUsers();

  return (
    <aside className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild className="z-50 fixed left-1 top-1">
          <Button variant="outline">P</Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Image
                priority
                src='/logo.png'
                alt="logo"
                className="rounded-lg"
                width={50}
                height={50}
              />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col p-2 h-[96%]">
            <div className="flex flex-col justify-between h-full ">
              <ul className="mt-5">
                <FirstRouteItem />
                <Separator className="mt-4 mb-4" />
                {/* <SecondRouteItem currentUser={currentUser} users={AllUsers!} /> */}
                <Separator className="mt-4 mb-4" />
                <ThirdRouteItem currentUser={currentUser} />
              </ul>
              
              <UserInterface currentUser={currentUser!} />
            </div>
          </div>
          <SheetFooter>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </aside>

  )
}

export default MobileSidebar;