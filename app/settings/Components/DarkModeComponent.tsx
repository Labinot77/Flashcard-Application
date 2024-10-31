"use client"

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

const DarkModeComponent = () => {
  const { setTheme, theme } = useTheme()

  return (
    <main className='w-max flex rounded-full shadow-2xl'>
      <div className={`${theme === 'dark' ? 'bg-black' : ''} cursor-pointer px-4 py-2 rounded-l-full `} onClick={() => setTheme('dark')}>
        Dark
      </div>
      <div className={`${theme === 'light' ? 'bg-black text-white' : ''} cursor-pointer px-4 py-2 `} onClick={() => setTheme('light')}>
        Light
      </div>
      <div className={`${theme === 'system' ? 'bg-black' : ''} cursor-pointer px-4 py-2 rounded-r-full`} onClick={() => setTheme('system')}>
        System
      </div>
    </main>
  )
}

export default DarkModeComponent