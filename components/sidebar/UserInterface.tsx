"use client"

import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { DefaultButton } from '../Buttons/DefaultButton';
import { SlLogout } from "react-icons/sl";
import { wait } from '@/lib/Misc';
import { logout } from '@/lib/actions/authentication/logout';
import { useState } from 'react';

interface Props {
  currentUser: User;
}


const UserInterface = ({ currentUser }: Props) => {
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  
const onSubmit = async () => {
  setIsSubmitting(true)
  
  await wait(Math.random() * 1000)

  logout()

  setIsSubmitting(false)
}

  return (
    <div className='flex justify-between items-center'>
    <Link href="/settings">
    <Image
      src={currentUser?.image as string}
      alt="logo"
      className="rounded-full"
      width={50}
      height={50}
    />
    </Link>

    <DefaultButton pending={isSubmitting} onClick={onSubmit}>
      <SlLogout className="h-5 w-5" />
    </DefaultButton>

    </div>
  )
}

export default UserInterface