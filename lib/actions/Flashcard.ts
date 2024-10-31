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

export const createFlashcards = async (collectionId: string, question: string, answer: string, hint: string) => {
  try {
    const res = await db.flashcard.create({
      data: {
        question,
        answer,
        hint,
        collectionId,
      }
    });

    return { success: true,  };
  } catch (error) {
    console.error("Error creating flashcards:", error);
    return { success: false, error: "Failed to create flashcards" };
  }
};


export const updateFlashcard = async (flashcard: any) => {
  try {
    const res = await db.flashcard.update({
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

    return { success: true };
  } catch (error: any) {
    throw new NextResponse("updateFlashcard", error)
  }
}


export const deleteFlashcard = async (id: string) => {
  try {
    await db.flashcard.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    throw new NextResponse("deleteFlashcard", error)
  }
}

