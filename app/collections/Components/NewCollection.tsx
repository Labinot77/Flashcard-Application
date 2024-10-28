"use client"

import { DefaultButton } from '@/components/Buttons/DefaultButton'
import { createCollection } from '@/lib/actions/Collection'
import { GoPlus } from 'react-icons/go'

const NewCollection = () => {
  return (
    <div className="min-w-[12rem] h-14 mt-2">
    <DefaultButton
    pending={false}
    onClick={() => createCollection("test", "Long description")} 
    className="w-full h-full rounded-md flex justify-center items-center" >
    <GoPlus size={80}/>
    </DefaultButton>
  </div>
  )
}

export default NewCollection