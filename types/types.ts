import { Collection, Flashcard, User } from "@prisma/client";

export type CollectionToUserExtended = Collection & {
  user: User;
};

export type CollectionData = {
  title: string;
  description?: string | null;
  // seen: string[];
  popularity: number;
  // userId: string;
  // createdAt: Date;
  // updatedAt: Date;
  id: string;
  flashcards: {
    id: string;
    collectionId: string | null;
    question: string;
    answer: string;
    hint?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};