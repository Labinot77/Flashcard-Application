import { getCurrentSessionUser } from '@/lib/actions/User'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import RegisterForm from './Components/RegisterForm';
import { wait } from '@/lib/Misc';

const page = async () => {
  const session = await getCurrentSessionUser();

  if (session?.id) {
    redirect('/collections')
  }

  return (
    <main className='flex flex-col items-center h-full '>
      <div className='flex flex-col w-[23rem] bg-primary-foreground p-6 rounded-md'>
      <h1 className="text-3xl w-full text-center font-bold mb-6">Register</h1>
        <small className="w-full text-center">Dont have an account? <br />
          <Link className="text-purple-600 font-bold underline" href="/authentication/login">
          Sign up
          </Link>
          </small>

        <RegisterForm />
      </div>
    </main>
  )
}

export default page