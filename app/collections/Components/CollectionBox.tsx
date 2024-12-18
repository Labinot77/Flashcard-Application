"use client"

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import { Separator } from "@/components/ui/separator";
import { getMostRecentDate, wait } from "@/lib/Misc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaDoorClosed } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DeleteModal from "@/components/Modals/DeleteModal";

interface Props {
  title: string;
  description?: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  flashcards: number;
}

const CollectionBox = ({ title, description, flashcards, id, createdAt, updatedAt }: Props) => {
  const router = useRouter();
  const recentDate = getMostRecentDate(createdAt, updatedAt)
  const [isLoading, setIsLoading] = useState({
    view: false,
    edit: false,
    // delete: false,
  });

  const handleButton = async (action: string, id: string) => {
    setIsLoading((prev) => ({ ...prev, [action]: true }))
    await wait(Math.random() * 1000)

    // if (action === "delete") {
    //   await deleteCollection(id)
    //   router.refresh()
    // } else {
      router.push(id)
    // }

    setIsLoading((prev) => ({ ...prev, [action]: false }))
  }

  return (
    <Card 
    className="p-3 mb-2"
    >
      <div className="flex gap-2 mb-1">
        <DefaultButton className="bg-green-700 w-full" type="button" disabledText="Loading" pending={isLoading.view} onClick={() => handleButton("view", `/collections/${id}`)} >
          <FaDoorClosed className="h-6 w-6 text-white" />
        </DefaultButton>
        <div className="w-full flex gap-2">
          <DefaultButton className="bg-orange-400 w-full" type="button" disabledText="Loading" pending={isLoading.edit} onClick={() => handleButton("edit", `/collections/edit/${id}`)} >
            <MdEdit className="h-6 w-6 text-white" />
          </DefaultButton>
          <DeleteModal id={id}>
          {/* <DefaultButton className="bg-red-700" pending={isLoading.delete} type="button" onClick={() => handleButton("delete", id)} >
            <MdDelete className="h-6 w-6 text-white" />
          </DefaultButton> */}
          <DefaultButton variant="destructive" pending={false} >
            <MdDelete className="h-6 w-6 text-white" />
          </DefaultButton>
        
        
          </DeleteModal>
        </div>
      </div>

      <CardHeader>
      <CardTitle className="text-2xl">{title}</CardTitle>
      <CardDescription className="">{description}</CardDescription>
      <Separator className="mt-1 mb-1" />
      <div className="flex justify-between">
        <small>Flashcards: {flashcards}</small>
        <small className="mr-2">{recentDate}</small>
      </div>
      </CardHeader>
    </Card>

  )
}

export default CollectionBox