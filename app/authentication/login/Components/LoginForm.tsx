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
import { LoginValidation } from "@/lib/validations/authentication"
import { DefaultButton } from "@/components/Buttons/DefaultButton"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { login } from "@/lib/actions/authentication/login"

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: '',
      password: '',
    }
  })
  const { isSubmitting } = form.formState

  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    try {
      const res = await login(values)

      if (res?.error) {
        toast({
          title: res.error,
          description: res.description,
        })
      } else if(res?.title){
        toast({
          title: res.title,
          description: res.description,
        })
        form.reset()

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
        <DefaultButton className="bg-green-600" pending={isSubmitting} disabledText="Logging in">Login in</DefaultButton>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm