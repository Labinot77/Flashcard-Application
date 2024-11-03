"use server"

import { LoginValidation } from "@/lib/validations/authentication"
import { z } from "zod"
import { getUserByEmail } from "../User"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"


export const login = async (values: z.infer<typeof LoginValidation>) => {
  const validatedFields = LoginValidation.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid data" }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: "User with this email doesn't exist!", description: "Try again" }
  }
  
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    })

      return {
        title: "Login Success",
        description: "You are logged in!",
        redirect: "/collections",
      }
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!", description: "The details you entered are incorrect" }
        default:
          return { error: "Something went wrong!", description: "This is a problem on our end, Try again" }
      }
    }
    throw error
  }
}