import { Collection, User } from "@prisma/client";

export type CollectionExtended = Collection & {
  user: User;
};