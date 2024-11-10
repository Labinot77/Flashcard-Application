"use client"

import { useRoutes1 } from '@/hooks/useRoutes';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from './ui/separator';

const LandingPageSitePreview = () => {
  const FirstRoutes = useRoutes1();

  return (
    <main className='flex h-[28rem] w-[52rem]'>
      <aside className='h-full rounded-md w-[12rem] lg:w-[16rem] '>
        <div className="flex flex-col p-4 h-full">
          <div className="inline-flex items-center gap-5">
            <Image
              src='/logo.png'
              alt="logo"
              className="rounded-lg"
              width={35}
              height={35}
            />
            {/* <p className="text-primary font-medium">Q-Flash</p> */}
          </div>


          <div className="flex flex-col justify-between h-full ">
            <ul className="mt-5">
              {FirstRoutes.map((item) => (
                <Link
                  key={item.href}
                  href=''
                  className="flex items-center gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:text-black"
                >
                  <item.icon className="h-6 w-6 shrink-0" />
                  <span className=''>{item.label}</span>
                </Link>
              ))}


              <Separator className="mt-4 mb-4" />
             
              <Separator className="mt-4 mb-4" />
{/* 
              {ThirdRoutes.map((item) => (
                <Link
                  key={item.href}
                  href=''
                  className="flex items-center gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:text-black"
                >
                  <item.icon className="h-6 w-6 shrink-0" />
                  <span className=''>{item.label}</span>
                </Link>
              ))} */}

            </ul>


          </div>
        </div>
      </aside>

      <div className='w-full h-full p-4 flex flex-col items-center'>
              <div className='w-full h-full'>

              </div>
      </div>
    </main>

  )
}

export default LandingPageSitePreview