"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { DefaultInput } from "../Inputs/DefaultInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { DefaultButton } from "../Buttons/DefaultButton";
import { User } from "@prisma/client";
import Image from "next/image";
import { updateUser } from "@/lib/actions/User";
import { toast } from "@/hooks/use-toast";
import DarkModeComponent from "../DarkModeComponent";



interface Props {
  // id: string;
  currentUser: User;
  children: React.ReactNode;
}

const SettingsModal = ({ children, currentUser }: Props) => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      id: currentUser.id,
      username: currentUser.name,
      email: currentUser.email,
      image: currentUser.image || "",
    },
  });

  const { isSubmitting } = form.formState;


  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
     await updateUser(values)

    toast({
      title: "Success",
      description: "Your settings have been updated successfully!",
    })

    setIsOpen(false)
    router.refresh()
  };

  return (
    <Dialog open={open} onOpenChange={(prev) => setIsOpen(prev)}>
    <DialogTrigger asChild>
      {children}
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>User Settings</DialogTitle>
        {/* <DialogDescription>Enter details and select users to add to this class.</DialogDescription> */}
      </DialogHeader>
      <div className="flex flex-col space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-4">

          <div className="flex flex-col gap-3 justify-center items-center cursor-pointer">
          <Image 
            src={form.watch("image") as string}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
         <p className="text-sm text-muted-foreground">ID: {currentUser.id}</p>
        </div>

          
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <DefaultInput {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <div className="flex justify-center w-full">
              <DarkModeComponent />
              </div>

            <DialogFooter>
              <DefaultButton pending={isSubmitting} type="submit">
                Save
              </DefaultButton>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default SettingsModal