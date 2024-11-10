"use client"

import { DefaultButton } from '@/components/Buttons/DefaultButton'
import { Card } from '@/components/ui/card'
import { wait } from '@/lib/Misc'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  btnText: string,
  href?: string
}

const ActivityCard = ({ btnText, href }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();
  const onSubmit = async () => {
    setIsLoading(true)

    await wait(Math.random() * 1000)

    if (href) {
    router.push(href)
    };

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
        <DefaultButton disabledText='Creating' pending={isLoading} onClick={onSubmit} className=''>
          {btnText}
          </DefaultButton>
      </div>
    </Card>
  )
}

export default ActivityCard