"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { User } from "@prisma/client"
import { UserValidation } from "@/lib/validations/user"
import { updateUser } from "@/lib/actions/User"
import { DefaultButton } from "@/components/Buttons/DefaultButton"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import DarkModeComponent from "./DarkModeComponent"
import { DefaultInput } from "@/components/Inputs/DefaultInput"

interface Props {
  currentUser: User;
}

function SettingsForm({ currentUser }: Props) {
  const router = useRouter()
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      image: currentUser.image || '',
      id: currentUser.id,
      username: currentUser.name,
      email: currentUser.email,
    },
  })
  const { isSubmitting } = form.formState

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const res = await updateUser(values)

    toast({
      title: "Success",
      description: "Your settings have been updated successfully!",
    })

    router.refresh()
  }

  const changeProfilePicutre = () => {
    const newImageURL = "https://i.pinimg.com/736x/a3/31/a8/a331a8d0a8ff50827c6cb3437f336a30.jpg"
    form.setValue("image", newImageURL)

    console.log("ASDas")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <div className="flex flex-col gap-3 justify-center items-center cursor-pointer">
          <Image 
            src={form.watch("image") as string}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
            onClick={() => changeProfilePicutre()}
          />
         <p className="text-sm text-muted-foreground">ID: {currentUser.id}</p>
        </div>
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Username</FormLabel>
              <FormControl>
                <DefaultInput className="text-xl"  placeholder={currentUser.name} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Email</FormLabel>
              <FormControl>
                <DefaultInput className="text-xl" placeholder={currentUser.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<div className="flex justify-center w-full">
        <DarkModeComponent />
</div>
        
        <DefaultButton pending={isSubmitting}>Submit</DefaultButton>
      </form>
    </Form>
  )
}

export default SettingsForm
