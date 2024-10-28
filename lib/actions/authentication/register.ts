"use server"

import { saltAndHashPassword } from "@/lib/Hash"
import { RegisterValidation } from "@/lib/validations/authentication"
import { z } from "zod"
import { getUserByEmail } from "../User"
import { db } from "@/db"



export const register = async (values: z.infer<typeof RegisterValidation>) => {
  const validatedFields = RegisterValidation.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid Data" }
  }

  const { username, email, password } = validatedFields.data
  const hasedPassword = saltAndHashPassword(password)

  try {
  const user = await getUserByEmail(email)

  if (user) {
    return { error: "User already exists", description: 'Try again' }
  }

    await db.user.create({
      data: {
        name: username,
        email: email,
        password: hasedPassword,
      },
    })

    return {
      title: "Registration Success",
      description: "You are registered!",
      redirect: "/authentication/login",
    }
  } catch (error) {
    return { error: "Registration Failed", description: "Something went wrong!" }
  }
}