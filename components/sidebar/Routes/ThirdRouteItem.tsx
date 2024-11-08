"use client"
import SettingsModal from '@/components/Modals/SettingsModal';
import { useRoutes3 } from '@/hooks/useRoutes';
import { User } from '@prisma/client';
import Link from 'next/link';
import { CiSettings } from 'react-icons/ci';

interface Props {
  currentUser: User;
}

const ThirdRouteItem = ({ currentUser }: Props) => {
  // const ThirdRoutes = useRoutes3();
  return (
    <>
    <SettingsModal currentUser={currentUser}>
    <div
        className={`flex items-center gap-x-3 rounded-md p-3 mt-2 leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:bg-secondary-foreground/40
          `} 
      >
        <CiSettings className="h-7 w-7 shrink-0" />
        <span className=''>Settings</span>
      </div>
    </SettingsModal>
    {/* {ThirdRoutes.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-x-3 rounded-md p-3 mt-2 leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:bg-secondary-foreground/40
          ${item.active ? "bg-secondary-foreground/30 text-black" : ""}`} 
      >
        <item.icon className="h-7 w-7 shrink-0" />
        <span className=''>{item.label}</span>
      </Link>
    ))} */}
    </>
  )
}

export default ThirdRouteItem