"use server"

import { db } from "@/db"
import { NextResponse } from "next/server"
import { getCurrentSessionUser } from "./User"
import { Flashcard } from "@prisma/client"

export const getFlashcards = async (collectionId: string) => { 
  try {
    const flashcards = await db.flashcard.findMany({
      where: {
        collectionId: collectionId,
      },
      select: {
        id: true,
        answer: true,
        question: true,
        hint: true,
        collectionId: true,
        collection: {
          select: {
            id: true,
            title: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return flashcards
  } catch (error: any) {
    throw new NextResponse("getFlashcards", error)
  }
}

// In actions/Flashcard.ts



// export const createFlashcard = async (collectionId: string, question: string, answer: string, hint: string) => {
//   try {
//     await db.flashcard.create({
//       data: {
//         question,
//         answer,
//         hint,
//         collectionId,
//       }
//     })
//   } catch (error: any) {
//     throw new NextResponse("createFlashcard", error)
//   }
// }


export const updateFlashcard = async (flashcards: any) => {
  try {
    const res = await Promise.all(
      flashcards.map((flashcard: any) =>
        db.flashcard.update({
          where: {
             id: flashcard.id
           },
          data: {
            question: flashcard.question,
            answer: flashcard.answer,
            hint: flashcard.hint,
            updatedAt: new Date(),
          },
        })
      )

      
    );

    return { success: true };
  } catch (error: any) {
    throw new NextResponse("updateFlashcard", error)
  }
}


