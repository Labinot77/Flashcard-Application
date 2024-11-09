"use client"

import { useCallback, useState, useTransition } from 'react'
import { deleteCollection } from '@/lib/actions/Collection'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { User } from '@prisma/client';
import { getUserClasses } from '@/lib/actions/Classes';

interface Props {
  id: string;
  currentUser: User;
  children: React.ReactNode;
}



const ShareModal = ({ children, currentUser, id }: Props) => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);
  // const userClasses = getUserClasses(currentUser.id);
  // console.log(userClasses)
  const onCopy = () => {
    navigator.clipboard.writeText(`https://localhost:3000/collections/${id}`)
  }

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
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-start">
          <DefaultButton
            disabledText="Sharing"
            pending={isLoading}
            onClick={() => {
              startTransition(async () => {
                await deleteCollection(id)
                setIsOpen(false)
                router.refresh()
              })
            }} type="button">
            Share
          </DefaultButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default ShareModal