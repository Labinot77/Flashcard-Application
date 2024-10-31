import { z } from "zod";

// export const FlashcardValidation = z.object({
//   question: z.string().min(2).max(50),
//   answer: z.string().min(2).max(50),
//   hint: z.string().min(2).max(50).optional()
// })

// export const FlashcardCreateValidation = z.object({
//   title: z.string().min(2),
//   description: z.string().optional(),
//   flashcards: z.array(
//     z.object({
//       id: z.string(),
//       question: z.string().min(2, {
//         message: "Question must be at least 2 characters long"
//       }).max(50),
//       answer: z.string().min(2, {
//         message: "Answer must be at least 2 characters long"
//       }).max(50),
//       hint: z.string().optional(),
//     })
//   )
// })

export const FlashcardValidation = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
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
    })
  ),
});


export const CollectionValidation = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
})



