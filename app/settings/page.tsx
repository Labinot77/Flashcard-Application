import { wait } from '@/lib/Misc'
import React from 'react'

const page = async() => {

  await wait(5000)
  return (
    <div className='w-full'>page</div>
  )
}

export default page