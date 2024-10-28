import { z } from "zod"
import { noSpaces } from "./Misc"

export const RegisterValidation = z.object({
  username: z.string().min(2, {
    message: "Name is required"
  }).max(15),
  email: z.string().min(2).max(50).email(),
  password: z.string().min(6).max(50).refine(noSpaces, {
    message: "Password cannot contain spaces",
  }),
})

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(5).refine(noSpaces, {
    message: "Password cannot contain spaces",
  })
})


