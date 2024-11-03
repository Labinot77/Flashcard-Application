import { z } from "zod"
import { noSpaces } from "../Misc"

export const RegisterValidation = z.object({
  username: z.string().min(2, {
    message: "Name is required"
  }).max(40, {
    message: "Name cannot exceed 40 characters"
  }),
  email: z.string().min(2).max(50).email(),
  password: z.string().min(5, {
    message: "Password is required"
  }).max(50, {
    message: "Password cannot exceed 50 characters"
  }).refine(noSpaces, {
    message: "Password cannot contain spaces",
  }),
})

export const LoginValidation = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(5, {
    message: "Password is required"
  }).max(50).refine(noSpaces, {
    message: "Password cannot contain spaces",
  })
})


