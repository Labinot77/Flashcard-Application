import { z } from "zod";

export const FlashcardValidation = z.object({
  collectionId: z.string(),
  title: z.string().min(1, "Title cannot be empty"),
  flashcards: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      options: z
      .array(z.string().min(1, "Option cannot be empty"))
      .length(4, "Exactly 4 options are required"),
      answer: z.string(),
      image: z.string().nullable(),
      collectionId: z.string(), // This is nullable instead of optional, because it is a required field in the database + TS complaining about it
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});


export const FlashcardSolving = z.object({
  
})