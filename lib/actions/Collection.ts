"use server"

import { db } from "@/db";
import { getCurrentSessionUser } from "./User"
import { NextResponse } from "next/server";
import { CollectionData } from "@/types/types";

export const getCollections = async () => {
  try {
    const currentUser = await getCurrentSessionUser();

    const collections = await db.collection.findMany({
      where: {
        userId: currentUser?.id,
      },
      include: {
        flashcards: true
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return collections
  } catch (error: any) {
    throw new Error("getCollections", error)
  }
}

export const getCollectionById = async (id: string) => {
  try {
    const collection = await db.collection.findUnique({
      where: {
        id,
      },
      include: {
        flashcards: true,
        user: true,
      }
    })
    
    return collection
  } catch (error: any) {
    throw new Error("getCollectionById", error)
  }
}

// type CreateCollectionResult = { success: boolean; error?: string };

export const createCollection = async (values: CollectionData) => {
  const currentUser = await getCurrentSessionUser()

  if (!currentUser?.id) {
    return false
  }

  try {
    const res = await db.collection.create({
      data: {
        title: values.title,
        description: values.description,
        userId: currentUser?.id,
        flashcards: {
          create: values.flashcards.map((flashcard) => ({
            question: flashcard.question,
            answer: flashcard.answer,
            hint: flashcard.hint,
          }))
        }
      },
      include: {
        flashcards: true,
      },
    })

    return res
  } catch (error: any) {
    return false
  }
}

export const deleteCollection = async (id: string) => {
  try {
    const collection = await db.collection.delete({
      where: {
        id,
      },
    })

    return collection
  } catch (error: any) {
    throw new Error("deleteCollection", error)
  }
}