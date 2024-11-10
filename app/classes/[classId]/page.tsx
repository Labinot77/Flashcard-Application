import { getClassbyId } from "@/lib/actions/Classes";
import Header from "./Components/Header";

interface Props {
  params: Promise<{
    classId: string
  }>;
}

const dynamicPage = async ({ params }: Props) => {
  const { classId } = await params;
  const currentClass = await getClassbyId(classId);
 
  if (!currentClass) {
    return (
      <main className="flex flex-col justify-center items-center h-full w-full">
        <h1 className="text-2xl">Couldn't find class</h1>
        <h1 className="text-xl">Try again</h1>
      </main>
    );
  }
  
  return (
    <div className="">
        <Header currentClass={currentClass} />
      {/* <div className="bg-black h-[70vh] rounded-lg p-4 w-full">Chat</div> */}

      <div>
        Shared collections
      </div>
    </div>
    
  );
};

export default dynamicPage;
