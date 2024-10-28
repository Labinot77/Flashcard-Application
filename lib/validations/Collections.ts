import { z } from "zod";

// export const FlashcardValidation = z.object({
//   question: z.string().min(2).max(50),
//   answer: z.string().min(2).max(50),
//   hint: z.string().min(2).max(50).optional()
// })

export const FlashcardValidation = z.object({
  flashcards: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      answer: z.string(),
      hint: z.string().optional(),
    })
  ),
});


export const CollectionValidation = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
})



