"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { DefaultButton } from '../Buttons/DefaultButton'
import { useState, useTransition } from 'react'
import { deleteCollection } from '@/lib/actions/Collection'
import { useRouter } from 'next/navigation'

interface Props {
  id: string;
  children: React.ReactNode;
}



const DeleteModal = ({ children, id }: Props) => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={(prev) => setIsOpen(prev)}>
    <DialogTrigger asChild>
      <div>
    {children}
        </div> 
    </DialogTrigger>
    <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="justify-start">
            <DefaultButton 
            disabledText="Deleting"
            variant="destructive"
            pending={isLoading} 
            onClick={() => {
              startTransition(async () => {
                await deleteCollection(id)
                setIsOpen(false)
                router.refresh()
              })
            }}  type="button">
              Delete
            </DefaultButton>
        </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default DeleteModal