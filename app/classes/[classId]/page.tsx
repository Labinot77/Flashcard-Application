import { getClassbyId } from "@/lib/actions/Classes";
import { DotsHorizontalIcon} from "@radix-ui/react-icons";
import Image from "next/image";

interface Props {
  params: {
    classId: string
  };
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
    <div className="p-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
        <h1 className="text-3xl">{currentClass.title}</h1>
        <span>{currentClass.description}</span>
        </div>
        <DotsHorizontalIcon className="h-7 w-7 mr-2 text-gray-500" />
      </div>


      <div className="flex mb-4 mt-4">
        {currentClass.classUsers.map((user) => (
        <Image
        src={user.user.image as string}
        alt="user"
        width={30}
        height={30}
        className="rounded-full"
      />
      ))}


      </div>

      <div className="bg-black h-[70vh] rounded-lg p-4 w-full">Chat</div>


      <div>
        Shared collections
      </div>
    </div>
    
  );
};

export default dynamicPage;
