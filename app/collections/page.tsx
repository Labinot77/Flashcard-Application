import { getCollections } from "@/lib/actions/Collection";
import CollectionBox from "./Components/CollectionBox";
import NewCollection from "./Components/NewCollection";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = async () => {
  const collections = await getCollections()

  if (collections.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center h-full gap-5">
      <h1 className="text-4xl">No Existing Collections</h1>
      <NewCollection />
      </main>
    )
  }
  
  return (
    <main className="h-full">
        <ScrollArea className="pr-4 h-full rounded-sm">
         {collections.map((item) => (
          <CollectionBox
            key={item.id}
            id={item.id}
            title={item.title} 
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            flashcards={item.flashcards.length} />
        ))}
        
        <NewCollection />
        </ScrollArea>
    </main>
  )
}

export default page
