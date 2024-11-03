"use client"

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { CollectionToUserExtended } from "@/types/types";
import { IoMdShuffle } from "react-icons/io";
import { User } from "@prisma/client";
import { addToLikesCollection } from "@/lib/actions/Collection";

interface Props {
  collection: CollectionToUserExtended;
  currentUser: User;
  recentTime: string;
  onRandomize: () => void;
}


const FlashcardMisc = ({ collection, currentUser ,recentTime, onRandomize }: Props) => {
  const params = useSearchParams();
  const isShuffled = params.get("randomized") === "true";
  const router = useRouter();


  const addToLiked = async () => {
    await addToLikesCollection(collection.id, currentUser.id)
    
    router.refresh()
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <div className="relative h-14 w-14">
            <Image
              src={collection.user.image as string}
              alt="Image"
              fill
              className="rounded-full" />
          </div>

          <div className="flex flex-col">
            <small>Created by</small>
            <p>{collection.user.name}</p>
            <small>{recentTime}</small>
          </div>
        </div>

        <div className="flex gap-2 ">
          <DefaultButton pending={false}>Share</DefaultButton> 
          <DefaultButton pending={false} onClick={addToLiked}>{collection.likes.includes(currentUser.id) ? "Hearted" : "Heart"}</DefaultButton> 
          {(collection.userId === currentUser.id && (
            <DefaultButton pending={false} onClick={() => router.push(`edit/${collection.id}`)}>Edit</DefaultButton>
            ))}
          <DefaultButton pending={false} className={`${isShuffled ? "bg-card bg-opacity-45 text-card-foreground" : "bg-transparent shadow-none text-foreground"}`} onClick={onRandomize}>
            <IoMdShuffle className="h-9 w-9" />
          </DefaultButton>
        </div>

      </div>
       <p className="mt-8">{collection.description}</p>

    </>

  )
}

export default FlashcardMisc