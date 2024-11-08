import { getCollectionById } from "@/lib/actions/Collection";
import EditForm from "./Components/EditForm";

interface Props {
  params: Promise<{
    id: string
  }>;
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  const collection = await getCollectionById(id);

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
      <EditForm
        collection={collection}
        flashcards={collection.flashcards} />
    </div>
  );
};

export default page;
