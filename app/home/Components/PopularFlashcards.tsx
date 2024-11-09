"use client"

import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import { CollectionToUserExtendedData } from "@/types/types";
import Image from "next/image";
import Link from "next/link"

interface Props {
  collection: CollectionToUserExtendedData;
}

const PopularFlashcards = ({ collection }: Props) => {
  return (
    <Link href={`/collections/${collection.id}`} key={collection.id}>
    <Card className="p-3 items-center bg-[#2e3856] h-[16vh] flex-1 shadow-none">
      <div className="flex flex-col justify-between h-full">
      <CardTitle className="text-lg leading-none -tracking-tight mb-2">{collection.title}</CardTitle>
      <div className='flex h-full justify-start items-start gap-2'>
        <div className="p-1 bg-[#586380] rounded-md w-fit h-fit">
          <p className="text-sm">{collection.flashcards?.length} terms</p>
        </div>

        <div className="p-1 bg-[#586380] rounded-md w-fit h-fit">
          <p className="text-sm">{collection.likes.length} likes</p>
        </div>
      </div>
        <CardFooter>
          <Image 
          src={collection.user.image as string}
          alt={collection.user.name}
          width={30}
          height={30}
          className='rounded-full' />
          <p className="ml-2">{collection.user.name}</p>
        </CardFooter>
      </div>
    </Card>
  </Link>
  )
}

export default PopularFlashcards