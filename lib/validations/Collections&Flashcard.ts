import { z } from "zod";

export const FlashcardValidation = z.object({
  collectionId: z.string(),
  title: z.string()
  .min(2, { message: "Description must be at least 5 characters long." })
  .max(50, { message: "Description cannot exceed 100 characters." }),
  description: z.string()
  .max(50, { message: "Description cannot exceed 100 characters." })
  .optional(),
  flashcards: z.array(
    z.object({
      id: z.string(),
      question: z.string().min(2, {
        message: "Question must be at least 2 characters long"
      }).max(50),
      answer: z.string().min(2, {
        message: "Answer must be at least 2 characters long"
      }).max(50),
      hint: z.string().optional(),
      collectionId: z.string().optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
      deleted: z.boolean().optional(),
    })
  ),
});

