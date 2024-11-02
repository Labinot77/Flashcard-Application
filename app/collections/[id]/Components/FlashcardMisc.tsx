"use client"

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { CollectionToUserExtended } from "@/types/types";
import { IoMdShuffle } from "react-icons/io";

interface Props {
  collection: CollectionToUserExtended;
  recentTime: string;
  onRandomize: () => void;
}


const FlashcardMisc = ({ collection, recentTime, onRandomize }: Props) => {
  const params = useSearchParams();
  const isShuffled = params.get("randomized") === "true";
  const router = useRouter();

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
          <DefaultButton pending={false} onClick={() => router.push(`edit/${collection.id}`)}>Edit</DefaultButton>
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