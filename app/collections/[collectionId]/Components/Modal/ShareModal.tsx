"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { Input } from '@/components/ui/input';
import { wait } from '@/lib/Misc';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { Checkbox } from '@/components/ui/checkbox'
import { ClassDataExtended } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShareModalSchema } from '@/lib/validations/Share';
import { z } from 'zod';
import { DefaultInput } from '@/components/Inputs/DefaultInput';
import { useForm } from 'react-hook-form';
import { GrayedButton } from '@/components/Buttons/GrayedButton';
import { shareCollection } from '@/lib/actions/Collection';

interface Props {
  id: string;
  currentUser: ClassDataExtended;
  children: React.ReactNode;
  isShuffled: boolean;
}

const ShareModal = ({ children, currentUser, isShuffled, id }: Props) => {
  const [open, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof ShareModalSchema>>({
    resolver: zodResolver(ShareModalSchema),
    defaultValues: {
      classes: []
    }
  });
  const { isSubmitting } = form.formState;
  const [isCopied, setIsCopied] = useState(false);
  const [search, setSearch] = useState('')
  const url = `http://localhost:3000/collections/${id}${isShuffled ? '?randomized=true' : ''}`

  const onCopy = async () => {
    setIsCopied(true)
    await wait(500)
    navigator.clipboard.writeText(url)
    setIsCopied(false)
  }

  const onSubmit = async (values: z.infer<typeof ShareModalSchema>) => {
    const res = await shareCollection(values.classes, id);
    // console.log(values.classes)
    console.log(res)
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
            defaultValue={url}
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full space-y-4"
          >
            <FormField
              control={form.control}
              name="classes"
              render={({ field }) => (
                <FormItem>
                  <Command className="rounded-lg border bg-card/50">
                    {/* Not using CommandInput because it's doenst support onChange */}
                    <DefaultInput
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="p-2 w-full"
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="py-2 pr-4 max-h-[15vh] overflow-y-auto">
                          {currentUser.classUsers.map((user) => {
                            const isChecked = field.value.includes(user.id)

                            return (
                              <CommandItem
                                key={user.id}
                                className="flex items-center justify-between space-x-2 mb-2 cursor-pointer hover:bg-primary-foreground/40 rounded"
                                onClick={() => {
                                  form.setValue(
                                    "classes",
                                    isChecked
                                      ? field.value.filter((id) => id !== user.id)
                                      : [...field.value, user.id],
                                    { shouldValidate: true }
                                  );
                                }}
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
                                  onClick={(e) => e.stopPropagation()} // Prevents row click event
                                  onCheckedChange={(isChecked) => {
                                    form.setValue(
                                      "classes",
                                      isChecked
                                        ? [...field.value, user.id]
                                        : field.value.filter((id) => id !== user.id),
                                      { shouldValidate: true }
                                    );
                                  }}
                                />
                              </CommandItem>
                            )
                          })}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </FormItem>
              )}
            />
            <DialogFooter className="justify-start">
              {form.watch("classes").length === 0 ? (
               <GrayedButton
               pending={true}
             >
               Share
             </GrayedButton>
              ): (
                <DefaultButton
                disabledText="Sharing"
                pending={isSubmitting}
              >
                Share
              </DefaultButton>
              )}
            </DialogFooter>
          </form>
        </Form>



      </DialogContent>
    </Dialog>
  )
}

export default ShareModal
