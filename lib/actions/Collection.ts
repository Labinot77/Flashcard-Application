"use server"

import { db } from "@/db";
import { getCurrentSessionUser } from "./User"
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

export const getMostPopularCollections = async () => {  
  try {
    const collection = await db.collection.findMany({
      include: {
        flashcards: true,
        user: true,
      },
    })
    
    const filteredCollections = collection
    .filter(collection => collection.likes.length > 0)
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 4);
    
    return filteredCollections;
  } catch (error:any) {
    throw new Error("getMostPopularCollections", error);
  }
}

export const getCollectionsLikedByUser = async () => {  
  try {
    const currentUser = await getCurrentSessionUser();
  
    if (!currentUser?.id) {
      return []
    }

    const collection = await db.collection.findMany({
      include: {
        flashcards: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

      const filteredCollections = collection
      .filter(collection => collection.likes?.includes(currentUser?.id))
      .slice(0, 4);
      
    return filteredCollections;
  } catch (error: any) {
    console.log("getCollectionsLikedByUser", error)
  }
}

export const getAllCollectionsSeenByUser = async () => { 
  try {
    const currentUser = await getCurrentSessionUser();
    // Returns an empty array if the user is not logged in
    if (!currentUser?.id) {
      return []
    }

    const res = await db.collection.findMany({
      include: {
        flashcards: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Gets the collections that the user has seen and slices them to the first 6
    const collectionsSeenByUser = res.
    filter(collection => collection.seen?.includes(currentUser?.id)
    ).slice(0, 4);

   return collectionsSeenByUser
  } catch (error: any) {
    throw new Error("getAllCollections", error)
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

export const addToSeenInCollection = async (collectionId: string, userId: string) => {
  try {
    const collection = await db.collection.findUnique({
      where: { id: collectionId },
      select: { seen: true }
    })

    if (collection && !collection?.seen?.includes(userId)) {
      await db.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          seen: {
            push: userId
          }
        },
      })
    }

  } catch (error: any) {
    throw new Error("addToSeenInCollection", error)
  }
}

export const addToLikesCollection = async (collectionId: string, userId: string) => {
  try {
    const collection = await db.collection.findUnique({
      where: { id: collectionId },
      select: { likes: true }
    })

    if (collection && !collection.likes.includes(userId)) {
      await db.collection.update({ 
        where: { id: collectionId },
        data: {
          likes: {
            push: userId
          }
        }
      })
    } else {
      await db.collection.update({
        where: { id: collectionId },
        data: {
          likes: {
            set: collection?.likes.filter(id => id !== userId) 
          }
        }
      })
    }


  } catch (error: any) {
    throw new Error("likeCollection", error)
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

export const createCollection = async (values: CollectionData) => {  
  try {
    const currentUser = await getCurrentSessionUser();
  
    if (!currentUser?.id) {
      return false
    };

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
      // Using include to get the flashcards lenght so I can show it in the toast
      include: {
        flashcards: true,
      },
    })

    return res
  } catch (error: any) {
    return false
  }
}

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

export const updateCollection = async (id: string, title: string, description?: string) => {
  try {
    await db.collection.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description
      }
    })
  } catch (error: any) {
    throw new Error("updateCollection", error)

  }
}