"use client"

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { CollectionToUserExtendedData } from "@/types/types";
import { User } from "@prisma/client"
import Link from "next/link";
import { LuDot } from "react-icons/lu";
import { PiCardsLight } from "react-icons/pi";

interface Props {
  collection: CollectionToUserExtendedData;
  currentUserData: User;
}


const Recent = ({ collection, currentUserData }: Props) => {
  const liStyle = "flex justify-center items-center";
  const liItems = [
    { content: "Flashcard set" }, 
    { content: <><LuDot /> terms {collection.flashcards?.length}</> },
    { content: <><LuDot /> {collection.userId === currentUserData?.id ? "by you" : `by ${collection.user.name}`}</> }
  ];

  return (
    <Link href={`/collections/${collection.id}`} key={collection.id}>
    <Card className="p-2 flex items-center gap-3 flex-1 bg-transparent shadow-none hover:bg-card">
      <div className='bg-card rounded-md p-2'>
        <PiCardsLight className='h-7 w-7 text-white' />
      </div>
      <div className='flex flex-col justify-center items-start'>
        <CardTitle className="text-base leading-none -tracking-tight">{collection.title}</CardTitle>
        <CardFooter>
        <ul className='flex'>
          {liItems.map((item, index) => (
            <li key={index} className={liStyle}>{item.content}</li>
          ))}
        </ul>
        </CardFooter>

      </div>
    </Card>
  </Link>
  )
}

export default Recent