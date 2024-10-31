"use client"

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { CollectionExtended } from "@/types/types";
import { IoMdShuffle } from "react-icons/io";

interface Props {
  collection: CollectionExtended;
  recentTime: string;
  onRandomize: () => void;
}


const FlashcardMisc = ({ collection, recentTime, onRandomize }: Props) => {
  const params = useSearchParams();
  const isShuffled = params.get("randomized") === "true";
    const {openModal} = useModal()
    const router = useRouter();
  const handleOpenModal = () => (
    openModal(
    <div className="flex flex-col">
      <small>Created by</small>
      <p>{collection.user.name}</p>
      <small>{recentTime}</small>
    </div>
    )
  )

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
          <DefaultButton pending={false} onClick={handleOpenModal}>Share</DefaultButton> 
          <DefaultButton pending={false} onClick={() => router.push(`edit/${collection.id}`)}>Edit</DefaultButton>
          <DefaultButton pending={false} className={`${isShuffled ? "bg-neutral-500 bg-opacity-45" : "bg-transparent shadow-none text-neutral-100"}`} onClick={onRandomize}>
            <IoMdShuffle className="h-9 w-9" />
          </DefaultButton>
        </div>

      </div>
       <p className="mt-8">{collection.description}</p>

    </>

  )
}

export default FlashcardMisc