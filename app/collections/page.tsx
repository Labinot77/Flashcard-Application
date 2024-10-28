import { getCollections } from "@/lib/actions/Collection";
import CollectionBox from "./Components/CollectionBox";
import NewCollection from "./Components/NewCollection";


const page = async () => {
  const collections = await getCollections()

  return (
    <main className="flex flex-wrap gap-4 h-full">
      <div className="w-full overflow-y-auto h-full">
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
      </div>
      





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
