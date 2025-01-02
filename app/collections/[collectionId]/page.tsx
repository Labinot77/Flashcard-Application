import { getCollectionById } from "@/lib/actions/Collection";
import { getCurrentSessionUserData } from "@/lib/actions/User";
import FlashcardsViewer from "./Components/FlashcardsViewer";

interface Props {
  params: Promise<{ 
    collectionId: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { collectionId } = await params;
  const currentUser = await getCurrentSessionUserData();
  const collection = await getCollectionById(collectionId);
  const flashcards = collection?.flashcards;

  if (!collection || !flashcards || !currentUser) {
    return (
      <main className="flex flex-col justify-center items-center h-full w-full">
        <h1 className="text-2xl">Couldn't find collection</h1>
        <h1 className="text-xl">Try again</h1>
      </main>
    );
  }


  return (
      <FlashcardsViewer flashcards={flashcards} />
  );
};

export default page;
