"use client"

import { useRoutes1 } from "@/hooks/useRoutes";
import Link from "next/link"


const FirstRouteItem = () => {
  const FirstRoutes = useRoutes1();

  return (
    <>
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
    </>
   
  )
}

export default FirstRouteItem