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
      <CardTitle className="text-lg leading-none -tracking-tight mb-2">{collection.title}</CardTitle>
      <div className='flex flex-col justify-center items-between h-full'>

        <div className="p-1 bg-[#586380] rounded-md w-max">
          <p className="text-sm">{collection.flashcards?.length} terms</p>
        </div>

        <CardFooter>
          <Image 
          src={collection.user.image as string}
          alt={collection.user.name}
          width={30}
          height={30}
          className='rounded-full' />
          <p>{collection.user.name}</p>
        </CardFooter>


      </div>
    </Card>
  </Link>
  )
}

export default PopularFlashcards