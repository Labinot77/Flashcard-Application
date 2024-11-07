"use client"

import { DefaultButton } from '@/components/Buttons/DefaultButton'
import CreateClassModal from '@/components/Modals/CreateClassModal'
import { Card } from '@/components/ui/card'
import { User } from '@prisma/client'

interface Props {
  currentUser: User;
  users: User[];
}

const CreateClassCard = ({ currentUser, users}: Props) => {
  return (
    <Card className='p-3 flex-1 '>
      <div className='h-28 w-[85%] mb-4'>
        <p className='leading-6 '>
        In this place I will put create collection and create class
        </p>

      </div>
      <div className='flex justify-end'>
         <CreateClassModal users={users} currentUser={currentUser}>
          <DefaultButton pending={false}>
            Create Class
            </DefaultButton>
         </CreateClassModal>
      </div>
    </Card>
  )
}

export default CreateClassCard