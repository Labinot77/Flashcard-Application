"use client"

import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { DefaultButton } from "../Buttons/DefaultButton";
import { logout } from "@/lib/actions/authentication/logout";
import { useRoutes1, useRoutes2, useRoutes3 } from "@/hooks/useRoutes";
import { useSession } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  const session = useSession();
  const FirstRoutes = useRoutes1();
  const SecondRoutes = useRoutes2();
  const ThirdRoutes = useRoutes3();

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
            {FirstRoutes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-x-3 rounded-md p-3 leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:text-black
                  ${item.active ? "bg-gray-100 text-black" : ""}`} 
              >
                <item.icon className="h-7 w-7 shrink-0" />
                <span className=''>{item.label}</span>
              </Link>
            ))}


            <Separator className="mt-4 mb-4" />
            {SecondRoutes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-x-3 rounded-md p-3 text-base leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:text-black
                  ${item.active ? "bg-gray-100 text-black" : ""}
                `}
              >
                <item.icon className="h-7 w-7 shrink-0" />
                <span className=''>{item.label}</span>
              </Link>
            ))}

            <Separator className="mt-4 mb-4" />

            {ThirdRoutes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-x-3 rounded-md p-3 text-base leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:text-black
                ${item.active ? "bg-gray-100 text-black" : ""}`}
              >
                <item.icon className="h-7 w-7 shrink-0" />
                <span className=''>{item.label}</span>
              </Link>
            ))}

          </ul>

          <div className="flex justify-between items-center">
            <Image
              src={session?.data?.user?.image || '/profilepic.jpg' as string}
              alt="logo"
              className="rounded-lg"
              width={40}
              height={40}
            />

            <DefaultButton
              className="bg-red-600"
              pending={false}
              onClick={() => logout()}
            >
              <IoIosLogOut />
            </DefaultButton>
          </div>


        </div>
      </div>
    </aside>
  )
}

export default Sidebar