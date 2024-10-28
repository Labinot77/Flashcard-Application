"use client"

import { DefaultButton } from "@/components/Buttons/DefaultButton";
import { Separator } from "@/components/ui/separator";
import { getMostRecentDate, wait } from "@/lib/Misc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaDoorClosed } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface Props {
  href: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  flashcards: number;
}

const CollectionBox = ({ title, description, flashcards, href, createdAt, updatedAt }: Props) => {
  const router = useRouter();
  const { formState: {isSubmitting }, handleSubmit } = useForm<FormData>(); 
  const recentDate = getMostRecentDate(createdAt, updatedAt)
 

  const onSubmit = async (url : string) => {
    await wait(Math.random() * 1000)
    
    router.push(url)
  }

  return (
    // @ts-ignore
    <form onSubmit={handleSubmit(onSubmit)}>
<main className="bg-[#FF7F50]/50 p-4 rounded-md min-w-[28rem] shadow-2xl">
      <div className="flex gap-2 mb-2">
          <DefaultButton className="bg-green-700 w-full" pending={isSubmitting} onClick={handleSubmit(() => onSubmit(`/collections/${href}`))} >
        <FaDoorClosed className="h-6 w-6 text-white" />
          </DefaultButton>
           <DefaultButton className="bg-orange-400 w-full" pending={isSubmitting} onClick={handleSubmit(() => onSubmit(`/collections/edit/${href}`))} >
        <MdEdit className="h-6 w-6 text-white" />
          </DefaultButton>
      </div>


      <h1 className="text-2xl">{title}</h1>
      <p>{description}</p>
      <Separator className="mt-1 mb-1"/>
      <div className="flex justify-between px-4">
      <small>Flashcards: {flashcards}</small>
      <small>{recentDate}</small>
      </div>
    </main>
    </form>
    
  )
}

export default CollectionBox