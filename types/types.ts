import { Collection, Flashcard, User } from "@prisma/client";

export type CollectionToUserExtended = Collection & {
  user: User;
};

export type CollectionData = {
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  flashcards: {
    question: string;
    answer: string;
    hint?: string | null;
  }[];
};