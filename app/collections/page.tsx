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
    <main className="flex flex-wrap gap-4 h-full">
        <ScrollArea className="pr-4 h-full w-full">
         {collections.map((item) => (
          <CollectionBox
            key={item.id}
            href={item.id} 
            title={item.title} 
            description={item.description!} 
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            flashcards={item.flashcards.length} />
        ))}
        
        <NewCollection />
        </ScrollArea>
      





      {/* <DefaultButton pending={false} onClick={() => createCollection("test", "test desc")} >
        Create a collection
      </DefaultButton> */}

      {/* <DefaultButton pending={false} onClick={() => createFlashcard("671e41acf543edb804d069a6", "This is question", "this is answer", "This is hint")} >
        Create a collection
      </DefaultButton> */}

      {/* {flashcards.map((item) => (
          <h1 className="mt-4">
            {item.question} <br />
            {item.answer} <br />
            {item.hint} <br />
            Collection id {item.id} <br />
            Collection array {item.collection.id} - {item.collection.title} <br />

          </h1>
        ))} */}

      {/* {collections.map((item) => (
        <h1>
          {item.title}
          {item.description}
          {item.flashcards.length}
        </h1>
      ))} */}
    </main>
  )
}

export default page
