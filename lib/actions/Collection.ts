"use server"

import { db } from "@/db";
import { getCurrentSessionUser } from "./User"
import { CollectionData } from "@/types/types";
import { Flashcard } from "@prisma/client";
import { createFlashcards, updateFlashcard } from "./Flashcard";
import { deleteFlashcard as deleteFlashcardFromDB } from "./Flashcard";

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

//////////////////////////////////////////////////////////////////////////////////////////////////

// Need to give tpes
export const createCollection = async (values: any) => {
  try {
    const currentUser = await getCurrentSessionUser();

    if (!currentUser?.id) {
      return false;
    }

    console.log(values)
    const res = await db.collection.create({
      data: {
        title: values.title,
        userId: currentUser.id,
        flashcards: {
          create: values.flashcards.map((flashcard: Flashcard) => ({
            question: flashcard.question,
            answer: flashcard.answer || "",
            options: flashcard.options,
            image: flashcard.image,
          })),
        },
      },
      include: {
        flashcards: true, // Include flashcards to count them for the toast
      },
    });

    return res;
  } catch (error: any) {
    console.error("Error creating collection:", error);
    return false;
  }
};


//////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////

export const updateCollection = async (
  id: string,
  title: string,
  existingFlashcards: Flashcard[],
  newFlashcards: Flashcard[],
  flashcardsToDelete: string[],
  description?: string
) => {
  try {
    // Update collection's title
    await db.collection.update({
      where: {
        id: id,
      },
      data: {
        title: title,
      },
    });

    // Delete flashcards that need to be removed
    if (flashcardsToDelete.length > 0) {
      for (const flashcardId of flashcardsToDelete) {
        await deleteFlashcardFromDB(flashcardId);
      }
    }

    // Update existing flashcards
    if (existingFlashcards.length > 0) {
      for (const flashcard of existingFlashcards) {
        await updateFlashcard(flashcard);
      }
    }

    // Create new flashcards
    if (newFlashcards.length > 0) {
      for (const flashcard of newFlashcards) {
        await createFlashcards(
          flashcard.collectionId!,
          flashcard.question,
          flashcard.answer,
          flashcard.options
        );
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error updating collection:", error);
    throw new Error("Failed to update collection");
  }
};