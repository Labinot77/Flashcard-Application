"use client"

import { User } from '@prisma/client'
import { DefaultButton } from '../Buttons/DefaultButton';
import { SlLogout } from "react-icons/sl";
import { wait } from '@/lib/Misc';
import { logout } from '@/lib/actions/authentication/logout';
import { useState, useTransition } from 'react';

interface Props {
  currentUser: User;
}


const UserInterface = ({ currentUser }: Props) => {
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  console.log(currentUser)
  
const onSubmit = async () => {
  setIsSubmitting(true)
  
  await wait(Math.random() * 1000)

  await logout()

  setIsSubmitting(false)
}

  return (
    <div className='flex justify-between items-center'>

    <DefaultButton disabledText='Logging out' pending={isSubmitting} onClick={onSubmit}>
      <SlLogout className="h-5 w-5" />
    </DefaultButton>

    </div>
  )
}

export default UserInterface