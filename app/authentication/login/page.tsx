import { getCurrentSessionUser } from '@/lib/actions/User'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import LoginForm from './Components/LoginForm';

const page = async () => {
  const session = await getCurrentSessionUser();

  if (session?.id) {
    redirect('/collections')
  }

  return (
    <main className='flex flex-col items-center h-full relative ' >
      <div className='flex flex-col w-[23rem] bg-primary-foreground/55 p-6 rounded-md'>
      <h1 className="text-3xl w-full text-center font-bold mb-6">Login</h1>
        <small className="w-full text-center">Dont have an account? <br />
          <Link className="text-purple-600 font-bold underline" href="/authentication/register">
          Sign up
          </Link>
          </small>

        <LoginForm />
      </div>
    </main>
  )
}

export default page