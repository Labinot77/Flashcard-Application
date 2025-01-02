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
import { Input } from "@/components/ui/input"
import { register } from "@/lib/actions/authentication/register"
import { RegisterValidation } from "@/lib/validations/authentication"
import { DefaultButton } from "@/components/Buttons/DefaultButton"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(RegisterValidation),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })
  const { isSubmitting } = form.formState

  const onSubmit = async (values: z.infer<typeof RegisterValidation>) => {
    try {
      const res = await register(values)

      if (res.error) {
        toast({
          title: res.error,
          description: res.description,
        })
      } else if(res.title){
        toast({
          title: res.title,
          description: res.description,
        })

        router.push(res.redirect)
      }

    } catch (error) {
      
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
        <DefaultButton className="bg-green-600" pending={isSubmitting} disabledText="Creating">Create an account</DefaultButton>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm