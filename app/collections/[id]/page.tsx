import { Button } from "@/components/ui/button";
import { addToSeenInCollection, getCollectionById } from "@/lib/actions/Collection"
import FlashcardSessionForm from "./Components/FlashcardSessionForm";
import { getCurrentSessionUser } from "@/lib/actions/User";

interface Props {
  params: { 
    id: string 
  };
}

const page = async ({ params }: Props) => {
  const { id } = await params
  const currentUser = await getCurrentSessionUser()
  const collection = await getCollectionById(id)
  const flashcards = collection?.flashcards
  
  if (!collection || !flashcards || !currentUser) {
    return (
    <main className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-2xl">Couldn't find collection</h1>
      <h1 className="text-xl">Try again</h1>
      </main>
    )
  }

  // if (currentUser?.id !== collection?.userId) {
      await addToSeenInCollection(collection.id, currentUser.id)
  // } 

  return (
   <FlashcardSessionForm collection={collection} flashcards={flashcards} currentUser={currentUser!} />
  )
}

export default page