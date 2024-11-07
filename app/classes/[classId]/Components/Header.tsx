"use client"

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import React from 'react'
import AvatarGroup from './AvatarGroup';
import { User } from '@prisma/client';
import { ClassDataExtended } from '@/types/types';
import ClassSettings from './ClassSettings';

interface Props {
  currentClass: ClassDataExtended;
}

const Header = ({ currentClass }: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl">{currentClass.title}</h1>
          <span>{currentClass.description}</span>
        </div>
      
      <ClassSettings />
      </div>

      <AvatarGroup users={currentClass.classUsers.map((cu: { user: User }) => cu.user)} />
    </>

  )
}

export default Header