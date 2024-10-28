import { getCollectionById, getCollections } from "@/lib/actions/Collection";
import EditForm from "./Components/EditForm";

interface Props {
  params: { 
    id: string 
  };
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  const collection = await getCollectionById(id);

  // Check if the collection was found
  if (!collection) {
    return (
      <main className="flex flex-col justify-center items-center h-full w-full">
        <h1 className="text-2xl">Couldn't find collection</h1>
        <h1 className="text-xl">Try again</h1>
      </main>
    );
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-start">
      <h1 className="text-5xl">{collection.title}</h1>
      <div className="flex flex-col gap-2 items-end">
      <small>ID: {collection.id}</small>
      <small>Number of Flashcards: {collection.flashcards.length}</small>
      </div>
      </div>

      <EditForm collectionId={collection.id} flashcards={collection.flashcards} />
    </div>
  );
};

export default page;
