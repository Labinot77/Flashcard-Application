import { Button } from "@/components/ui/button";
import { getCollectionById } from "@/lib/actions/Collection"
import FlashcardSessionForm from "./Components/FlashcardSessionForm";

interface Props {
  params: { 
    id: string 
  };
}

const page = async ({ params }: Props) => {
  const { id } = await params
  const collection = await getCollectionById(id)
  const flashcards = collection?.flashcards
  if (!collection || !flashcards) {
    return (
    <main className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-2xl">Couldn't find collection</h1>
      <h1 className="text-xl">Try again</h1>
      </main>
    )
  }

 



  return (
   <FlashcardSessionForm collection={collection} flashcards={flashcards} />
  )
}

export default page