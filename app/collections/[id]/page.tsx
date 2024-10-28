import { getCollectionById } from "@/lib/actions/Collection"

interface Props {
  params: { 
    id: string 
  };
}

const page = async ({ params }: Props) => {
  const { id } = await params
  const collections = await getCollectionById(id)

  if (!collections) {
    return (
    <main className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-2xl">Couldn't find collection</h1>
      <h1 className="text-xl">Try again</h1>
      </main>
    )
  }


  return (
    <div>
      <h1>{collections.title}</h1>
      <h1>{collections.description}</h1>
      <h1>{collections.flashcards.length}</h1>

      {collections.flashcards.map((item) => (
        <>
        <h1>{item.collectionId}</h1>
        <h1>{item.question}</h1>
        <h1>{item.answer}</h1>
        <h1>{item.hint}</h1>
        </>

      ))}
      </div>
  )
}

export default page