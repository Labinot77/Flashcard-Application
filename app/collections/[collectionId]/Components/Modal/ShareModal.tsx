"use client"

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { Input } from '@/components/ui/input';
import { wait } from '@/lib/Misc';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { Checkbox } from '@/components/ui/checkbox'
import { ClassDataExtended } from '@/types/types';

interface Props {
  id: string;
  currentUser: ClassDataExtended;
  children: React.ReactNode;
  isShuffled: boolean;
}

const ShareModal = ({ children, currentUser, isShuffled, id }: Props) => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);
  const [search, setSearch] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Track selected users
  const parars = useSearchParams();

  console.log(currentUser.classUsers)
  const onCopy = async () => {
    setIsCopied(true)
    await wait(500)
    navigator.clipboard.writeText(`http://localhost:3000/collections/${id}${isShuffled ? '?randomized=true' : ''}`)
    setIsCopied(false)
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter(id => id !== userId); // Remove user
      }
      return [...prevSelectedUsers, userId]; // Add user
    });
  }

  return (
    <Dialog open={open} onOpenChange={(prev) => setIsOpen(prev)}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Collection</DialogTitle>
          <DialogDescription>
            Share this collection with your friends and colleagues.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Input
            defaultValue={`http://localhost:3000/collections/${id}${isShuffled ? '?randomized=true' : ''}`}
            placeholder="Share Link"
            className="w-full"
          />
          <DefaultButton
            pending={isCopied}
            type="button"
            disabledText='Copying'
            onClick={onCopy}
          >
            Copy Link
          </DefaultButton>
        </div>

        <Command className="rounded-lg border bg-card/50">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 w-full"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="py-2 pr-4 max-h-[15vh] overflow-y-auto">
                {currentUser.classUsers.filter((user) => user.user.name.toLowerCase().includes(search.toLowerCase())).map((user) => {
                  const isChecked = selectedUsers.includes(user.id); // Check if the user is selected

                  return (
                    <CommandItem
                      key={user.id}
                      className="flex items-center justify-between space-x-2 mb-2 cursor-pointer hover:bg-primary-foreground/40 rounded"
                      onClick={() => toggleUserSelection(user.id)} // Toggle user selection on row click
                    >
                      <label
                        htmlFor={user.id}
                        className="flex items-center space-x-2 w-full cursor-pointer"
                      >
                        <MdOutlinePeopleAlt className="mr-2" />
                        <p>{user.class.title} <span className="text-muted-foreground opacity-50">({user.classId})</span></p>
                      </label>

                      <Checkbox
                        id={user.id}
                        value={user.id}
                        checked={isChecked}
                        onClick={(e) => e.stopPropagation()} // Prevents row click event from being triggered
                        onCheckedChange={(isChecked) => {
                          if (isChecked) {
                            setSelectedUsers((prev) => [...prev, user.id]); // Add to selection
                          } else {
                            setSelectedUsers((prev) => prev.filter(id => id !== user.id)); // Remove from selection
                          }
                        }}
                      />
                    </CommandItem>
                  )
                })}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>

        <DialogFooter className="justify-start">
          <DefaultButton
            disabledText="Sharing"
            pending={isLoading}
            onClick={() => {
              // You can trigger a share action here with selectedUsers
            }}
            type="button"
          >
            Share
          </DefaultButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareModal
