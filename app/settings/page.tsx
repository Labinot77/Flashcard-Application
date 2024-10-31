import { getCurrentSessionUser } from '@/lib/actions/User'
import SettingsForm from './Components/SettingsForm'

const page = async () => {
  const currentUser = await getCurrentSessionUser()

  if (!currentUser) {
    return (
      <div className='w-[90%] h-full flex justify-center items-center'>
        <h1 className='text-xl'>
          Your user data is not found, please relog
        </h1>
      </div>
    )
  }

  return (
    <main className='w-[90%]'>
      <SettingsForm currentUser={currentUser} />
    </main>
  )
}

export default page