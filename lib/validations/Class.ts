import { z } from "zod";

export const ClassCreationValidation = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters long" }).max(30, { message: "Title cannot exceed 30 characters." }),
  description: z.string().max(50, { message: "Description cannot exceed 100 characters." }).optional(),
  classUsers: z.array(z.string()).min(1, "Please select at least one user"),
});
