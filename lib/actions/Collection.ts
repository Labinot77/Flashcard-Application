"use server"

import { db } from "@/db";
import { getCurrentSessionUser } from "./User"

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
      }
    })
    
    return collection
  } catch (error: any) {
    throw new Error("getCollectionById", error)
  }
}

export const createCollection = async (title: string, description: string) => {
  try {
    const currentUser = await getCurrentSessionUser();

    if (!currentUser) { throw new Error("User not found") }

    const collection = await db.collection.create({
      data: {
        title,
        description,
        userId: currentUser?.id,
      }
    })

    return collection
  } catch (error: any) {
    throw new Error("createCollection", error)
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