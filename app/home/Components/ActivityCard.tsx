"use client"

import { DefaultButton } from '@/components/Buttons/DefaultButton'
import { Card } from '@/components/ui/card'
import { wait } from '@/lib/Misc'
import React, { useState } from 'react'

interface Props {
  btnText: string
}

const ActivityCard = ({ btnText }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async () => {
    setIsLoading(true)

    await wait(2000)

    setIsLoading(false)


  }


  return (
    <Card className='p-3 flex-1 '>
      <div className='h-28 w-[85%] mb-4'>
        <p className='leading-6 '>
        In this place I will put create collection and create class
        </p>

      </div>
      <div className='flex justify-end'>
        <DefaultButton pending={isLoading} onClick={onSubmit} className=''>{btnText}</DefaultButton>
      </div>
    </Card>
  )
}

export default ActivityCard