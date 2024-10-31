import { Collection, Flashcard, User } from "@prisma/client";

export type CollectionToUserExtended = Collection & {
  user: User;
};

export type CollectionData = {
  title: string;
  description?: string;
  flashcards: {
    question: string;
    answer: string;
    hint?: string;
  }[];
};