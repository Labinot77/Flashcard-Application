import { Classes, Collection, Flashcard, User, ClassUser} from "@prisma/client";

export type CollectionToUserExtended = Collection & {
  user: User;
};

export type CollectionToUserExtendedData = Collection & {
  user: User;
  flashcards: Flashcard[];
};

export type CollectionData = {
  title: string;
  description?: string | null;
  collectionId?: string | null;
  // seen: string[];
  // popularity: number;
  // userId: string;
  // createdAt: Date;
  // updatedAt: Date;
  // id: string;
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

export type ClassUserExtended = ClassUser & {
  class: Classes; // Reference to the class the user is enrolled in
  user: User;     // Reference to the user
};

export type ClassDataExtended = Classes & {
  users: User[]; // List of users enrolled in the class
  classUsers: ClassUserExtended[];
};

export type UserDataExtendedToClassDataExtended = User & {
  classUsers: ClassUserExtended[];
}

export type ClassDataExtendedUserClassesExtended = ClassUserExtended & {
  class: Classes; // Class related to this class user
};
