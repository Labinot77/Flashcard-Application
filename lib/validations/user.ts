import { z } from "zod";

export const UserValidation = z.object({
  id: z.string().optional(),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  image: z.string().optional(),
})

